import {
	_augmentListener,
	_mutationCallback,
	_onNodeAdded,
	_onNodeRemoved,
} from "../helpers";
import {
	fake,
	spy,
	stub,
} from "sinon";

const mockEvent = {
	type: "click"
};

test("_augmentListener calls listener for outside events", () => {
	const stubbedIsOutsideTarget = fake.returns(true);
	const listener = stub();
	_augmentListener(stubbedIsOutsideTarget)({}, listener)(mockEvent);

	expect(listener.calledWith(mockEvent)).toBe(true);
});

test("_augmentListener does not call listener for inside events", () => {
	const stubbedIsOutsideTarget = fake.returns(false);
	const listener = stub();
	_augmentListener(stubbedIsOutsideTarget)({}, listener)(mockEvent);

	expect(listener.callCount).toBe(0);
});

test("_mutationCallback calls _onNodeAdded and _onNodeRemoved for each mutation", () => {
	const onNodeAdded = stub();
	const onNodeRemoved = stub();
	const el = "el";
	const events = "events";
	const mutationList = [0, 1];

	_mutationCallback(onNodeAdded, onNodeRemoved)(el, events)(mutationList);

	expect(onNodeAdded.callCount).toBe(2);
	expect(onNodeAdded.args[0][0]).toBe(el);
	expect(onNodeAdded.args[0][1]).toBe(events);
	expect(onNodeAdded.args[0][2]).toBe(mutationList[0]);
	expect(onNodeAdded.args[1][0]).toBe(el);
	expect(onNodeAdded.args[1][1]).toBe(events);
	expect(onNodeAdded.args[1][2]).toBe(mutationList[1]);

	expect(onNodeRemoved.callCount).toBe(2);
	expect(onNodeRemoved.args[0][0]).toBe(el);
	expect(onNodeRemoved.args[0][1]).toBe(events);
	expect(onNodeRemoved.args[0][2]).toBe(mutationList[0]);
	expect(onNodeRemoved.args[1][0]).toBe(el);
	expect(onNodeRemoved.args[1][1]).toBe(events);
	expect(onNodeRemoved.args[1][2]).toBe(mutationList[1]);
});

test("_onNodeAdded returns false if there are no added nodes", () => {
	expect(_onNodeAdded("foo", "foo", {
		addedNodes: []
	})).toBe(true);
});

test("_onNodeAdded does not add the listener to document if an interested node is not added", () => {
	const addedNodes = ["node"];
	const events = [{
		el: addedNodes[0],
		listener: stub(),
		type: "type",
	}];
	const mutation = {
		addedNodes,
	};

	spy(document, "addEventListener");
	_onNodeAdded("notInAddedNodes", events, mutation);
	expect(document.addEventListener.callCount).toBe(0);
	document.addEventListener.restore();
});

test("_onNodeAdded adds the listener to document if an interested node is added", () => {
	const addedNodes = ["node"];
	const events = [{
		el: addedNodes[0],
		listener: stub(),
		type: "type",
	}];
	const mutation = {
		addedNodes,
	};

	spy(document, "addEventListener");
	_onNodeAdded(addedNodes[0], events, mutation);
	expect(document.addEventListener.callCount).toBe(1);
	document.addEventListener.restore();
});

test("_onNodeRemoved returns false if there are no removed nodes", () => {
	expect(_onNodeRemoved("foo", "foo", {
		removedNodes: []
	})).toBe(false);
});

test("_onNodeRemoved does not add the listener to document if an interested node is not removed", () => {
	const removedNodes = ["node"];
	const events = [{
		el: removedNodes[0],
		listener: stub(),
		type: "type",
	}];
	const mutation = {
		removedNodes,
	};

	spy(document, "removeEventListener");
	_onNodeRemoved("notInRemovedNodes", events, mutation);
	expect(document.removeEventListener.callCount).toBe(0);
	document.removeEventListener.restore();
});

test("_onNodeRemoved adds the listener to document if an interested node is removed", () => {
	const removedNodes = ["node"];
	const events = [{
		el: removedNodes[0],
		listener: stub(),
		type: "type",
	}];
	const mutation = {
		removedNodes,
	};

	spy(document, "removeEventListener");
	_onNodeRemoved(removedNodes[0], events, mutation);
	expect(document.removeEventListener.callCount).toBe(1);
	document.removeEventListener.restore();
});
