import Swal from "sweetalert2";

export const showFetchError = (func: any): void => {
  Swal.fire({
    title: "Произошла ошибка!",
    text: "Данные не были сохранены. Отправить заного?",
    icon: "error",
    showCancelButton: true,
    cancelButtonText: "Отмена",
    confirmButtonColor: "#0b61a4",
    cancelButtonColor: "#e97d72",
    confirmButtonText: "Повторить",
  }).then((result) => {
    if (result.isConfirmed) {
      func();
    }
  });
};
