export const _isOutsideTarget = (target, root) => {
	if (target.parentNode === null) {
		return true;
	}

	if (target === root) {
		return false;
	}

	if (target.parentNode === root) {
		return false;
	}

	return _isOutsideTarget(target.parentNode, root);
};

export const _augmentListener = (isOutsideTarget) => (el, listener) => (e) => {
	const outer = isOutsideTarget(e.target, el);

	if (outer) {
		listener(e);
	}
};

export const _onNodeRemoved = (el, events, mutation) => {
	if (mutation.removedNodes.length === 0) {
		return false;
	}

	Array.prototype.slice.call(mutation.removedNodes).map((node) => {
		if (node === el) {
			events.filter((event) => event.el === el)
				.forEach((event) => document.removeEventListener(event.type, event.listener));
		}
	});
};

export const _onNodeAdded = (el, events, mutation) => {
	if (mutation.addedNodes.length === 0) {
		return false;
	}

	Array.prototype.slice.call(mutation.addedNodes).map((node) => {
		if (node === el) {
			events.filter((event) => event.el === el)
				.forEach((event) => document.addEventListener(event.type, event.listener));
		}
	});
};

export const _mutationCallback = (onNodeAdded, onNodeRemoved) => (el, events) => (mutationList) => {
	mutationList.map((mutation) => {
		onNodeAdded(el, events, mutation);
		onNodeRemoved(el, events, mutation);
	});
};

