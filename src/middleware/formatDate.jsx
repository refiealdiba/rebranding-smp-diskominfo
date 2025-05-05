const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default formatDate;
