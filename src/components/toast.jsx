import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 9000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const showSuccessToast = ({ icon, title }) => {
  Toast.fire({
    icon: `${icon}`,
    title: `${title}`,
  });
};

export default showSuccessToast;
