import OutsideEvents from "../src/outside-events";
import "./styles.less";

const outer = document.querySelector(".outer");
const el = document.querySelector(".main");
const foo = new OutsideEvents(el);
const mouseMoveListener = () => {
	console.log("outer mouse move!");
};

let added = true;

foo.addEventListener("click", () => {
	if (added) {
		foo.removeEventListener("mousemove", mouseMoveListener);
	} else {
		foo.addEventListener("mousemove", mouseMoveListener);
	}

	added = !added;
});
foo.addEventListener("mousemove", mouseMoveListener);

outer.removeChild(el);
outer.appendChild(el);