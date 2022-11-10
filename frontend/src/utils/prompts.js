import Swal from "sweetalert2";

export const defaultWarnPrompt = (title, text) => {
	return Swal.fire({
		title: title,
		text: text,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#01bf71",
		cancelButtonColor: "#d33",
		confirmButtonText: "Continue",
		allowEnterKey: false,
		focusConfirm: false,
		focusCancel: false,
		focusDeny: false,
	});
};

export const Toast = Swal.mixin({
	toast: true,
	position: "bottom-start",
	showConfirmButton: false,
	timer: 4000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

export const uuidv4 = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
};
