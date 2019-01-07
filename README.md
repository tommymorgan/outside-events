# Outside Events
Outside Events let's you listen for events that happen outside the bounds of a
specified element.  It was inspired by
[jQuery outside events](https://github.com/cowboy/jquery-outside-events).

Events will be added to `document` and will automatically be removed if the
interested node is removed from the DOM and will be re-added if the node is
reattached.

## Installation
`npm i -S outside-events`

## Usage
```
import OutsideEvents from "outside-events";

const el = document.querySelector(".foo");
const outsideEvents = new OutsideEvents(el);

// events are added by specifying an event type and a listener function
outsideEvents.addEventListener("click", (ev) => {
	alert(ev);
});

// events can be manually removed
outsideEvents.removeEventListener("click");
```
