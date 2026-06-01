function updateAllClocks() {
    const elements = document.querySelectorAll("[data-timezone]");
    const currentDateTime = new Date();

    elements.forEach(element => {
        const timezone = element.getAttribute("data-timezone");

        const formattedDateTime = currentDateTime.toLocaleString("en-US", {
            timeZone: timezone === "local" ? undefined : timezone,
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).replace(" AM", "am")
          .replace(" PM", "pm");

        element.textContent = formattedDateTime;
    });
}

updateAllClocks();
setInterval(updateAllClocks, 1000);

function convertESTToLocal(timeStr) {
    const [h, m = "00"] = timeStr.split(":");

    const estDate = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    estDate.setHours(Number(h), Number(m), 0, 0);

    return estDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).toLowerCase().replace(" ", "");
}

document.querySelectorAll("[data-timestamp-time]").forEach(el => {
    el.textContent = convertESTToLocal(el.dataset.timestampTime);
});