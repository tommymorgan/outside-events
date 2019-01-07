import {
	_augmentListener,
	_isOutsideTarget,
	_mutationCallback,
	_onNodeAdded,
	_onNodeRemoved,
} from "./helpers";

export default function(el) {
	this._events = [];
	const mutationCallback = _mutationCallback(_onNodeAdded, _onNodeRemoved)(el, this._events);
	const observer = new MutationObserver(mutationCallback);

	observer.observe(el.parentNode, {
		childList: true,
		attributes: false,
		subtree: false,
	});

	this.addEventListener = (type, listener) => {
		const augmentedListener = _augmentListener(_isOutsideTarget)(el, listener);
		document.addEventListener(type, augmentedListener);
		this._events.push({
			el,
			listener: augmentedListener,
			type,
		});
	};

	this.removeEventListener = (type) => {
		const removedEvents = this._events.filter((event) => event.el === el && event.type === type);
		const keptEvents = this._events.filter((event) => event.el === !el || event.type !== type);

		removedEvents.map((event) => document.removeEventListener(event.type, event.listener));
		this._events = keptEvents;
	};
}