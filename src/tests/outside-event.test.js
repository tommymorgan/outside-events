import OutsideEvents from "../outside-events";
import {
	spy,
	stub,
} from "sinon";

let outsideEvents;
let event;
let html = `
	<div class="outer">
		<div class="main">
			<div class="nested">0</div>
		</div>
	</div>
`;

describe("Browser", () => {
	beforeEach(() => {
		window.MutationObserver = function() {
			this.observe = stub();
		};
		document.body.innerHTML = html;

		let nested = document.querySelector(".nested");
		let listener = (ev) => {
			nested.innerHTML = ++nested.innerHTML;
		};
	
		const el = document.querySelector(".main");
		outsideEvents = new OutsideEvents(el);
		outsideEvents.addEventListener("click", listener);

		event = document.createEvent("MouseEvents");
		event.initEvent("click", true, true);
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

		expect(el.innerHTML).toBe("0");
	});
	
	test("events on self don't trigger listeners", () => {
		const el = document.querySelector(".main");
		el.dispatchEvent(event);

		expect(document.querySelector(".nested").innerHTML).toBe("0");
	});
	
	test("events on ancestors trigger listeners", () => {
		let el = document.querySelector(".outer");
		el.dispatchEvent(event);
	
		expect(document.querySelector(".nested").innerHTML).toBe("1");
	
		el = document.querySelector("body");
		el.dispatchEvent(event);
	
		expect(document.querySelector(".nested").innerHTML).toBe("2");
	});
});
