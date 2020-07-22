$(async function init () {
    try {
        const selectValue = $("#selectOption").val();
        const resultFromServer = await getUsersFromServer({ url: `https://randomuser.me/api/?results=${selectValue}` });
        const { results } = resultFromServer;
        console.log(results);
    } catch (err) {
        console.log(err);
        alert(`message: ${err.statusText} , status: ${err.status}`);
    }
})