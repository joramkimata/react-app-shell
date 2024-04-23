import { toast } from "react-toastify";
import swal from "sweetalert";

export const showToast = (
    message,
    error = true,
    options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
) => {
    return error
        ? toast.error(message, options)
        : toast.success(message, options);
};

export const showToastTop = (
    message,
    error = true,
    options = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
) => {
    return error
        ? toast.error(message, options)
        : toast.success(message, options);
};

export const showToastData = (
    data,
    title = `Successfully saved!`,
    top = false
) => {
    if (data.code === 9000) {
        if (top) {
            showToastTop(title, false);
        } else {
            showToast(title, false);
        }
    } else {
        showToastTop(`${data.errorDescription}`);
        return;
    }
};

export const promptBox = (
    cb,
    title = "Once deleted, you will not be able to recover?"
) => {
    swal({
        title: "Are you sure?",
        text: title,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            cb();
        }
    });
};

export const infoBox = (title) => {
    swal({
        text: title,
        icon: "info",
    });
};

export const warningBox = (title) => {
    swal({
        text: title,
        icon: "warning",
    });
};

export const format = (seconds) => {
    if (isNaN(seconds)) {
        return "00:00";
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    if (hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }

    return `${mm}:${ss}`;
};