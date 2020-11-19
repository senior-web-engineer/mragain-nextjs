import jQuery from "jquery";

export default function authHeader() {
    getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    return {
        headers: {
            get: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            post: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
                Accept: "application/json",
            },
        },
        withCredentials: true,
    }
}

