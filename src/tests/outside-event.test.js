import OutsideEvents from "../outside-events";
import {
	spy,
	stub,
} from "sinon";

let outsideEvents;
let listener;
let event;
let html = `
	<div class="outer">
		<div class="main">
			<div class="nested"></div>
		</div>
	</div>
`;

beforeEach(() => {
	window.MutationObserver = function() {
		this.observe = stub();
	};

	document.body.innerHTML = html;
	listener = stub();

	const el = document.querySelector(".main");
	outsideEvents = new OutsideEvents(el);
	outsideEvents.addEventListener("click", listener);
	event = document.createEvent("MouseEvents");
	event.initEvent("click", true, true);
});

test("addEventListener adds listener to document", () => {
	spy(document, "addEventListener");

	outsideEvents.addEventListener("mousemove", stub());
	expect(document.addEventListener.callCount).toBe(1);
	expect(document.addEventListener.args[0][0]).toEqual("mousemove");
	expect(typeof document.addEventListener.args[0][1]).toEqual("function");

	document.addEventListener.restore();
});

test("addEventListener adds listener meta data to _events array", () => {
	outsideEvents.addEventListener("mousemove", stub());

	const found = outsideEvents._events.find((event) => event.type === "mousemove");

	expect(found).toBeDefined();
});

test("removeEventListener removes listener from document", () => {
	spy(document, "removeEventListener");

	outsideEvents.removeEventListener("click");
	expect(document.removeEventListener.callCount).toBe(1);
	expect(document.removeEventListener.args[0][0]).toEqual("click");
	expect(typeof document.removeEventListener.args[0][1]).toEqual("function");

	document.removeEventListener.restore();
});

test("removeEventListener removes listener meta data from _events array", () => {
	outsideEvents.removeEventListener("mousemove");

	const found = outsideEvents._events.find((event) => event.type === "mousemove");

	expect(found).toBeUndefined();
});

test("nested elements don't trigger listeners", () => {
	const el = document.querySelector(".nested");
	el.dispatchEvent(event);

	expect(listener.called).toBe(false);
});

test("events on self don't trigger listeners", () => {
	const el = document.querySelector(".main");
	el.dispatchEvent(event);

	expect(listener.called).toBe(false);
});

test("events on ancestors trigger listeners", () => {
	let el = document.querySelector(".outer");
	el.dispatchEvent(event);

	expect(listener.callCount).toBe(1);

	el = document.querySelector("body");
	el.dispatchEvent(event);

	expect(listener.callCount).toBe(2);
});
