//Local Storge:
$("#selectOption").val(localStorage.getItem("optionValue"));

//Mapping the data from the server by:
const mapping = {
    name: { fn: _getName, isVisible: true },
    city: { fn: _getCity, isVisible: true },
    address: { fn: _getAddress, isVisible: true },
    imgSrc: { fn: _getImage, isVisible: true },
};

function _getName (user) {
    return `${user.name.first} ${user.name.last}`;
};

function _getAddress (user) {
    return `${user.location.street.name} ${user.location.street.number}`;
};

function _getCity (user) {
    return `${user.location.city}`;
};

function _getImage (user) {
    return `${user.picture.medium}`;
};

async function init () {
    try {
        const selectValue = $("#selectOption").val();
        const response = await getUsersFromServer({ url: `https://randomuser.me/api/?results=${selectValue}` });
        const { results } = response;
        draw(results)
    } catch (err) {
        console.log(err);
        alert(`message: ${err.statusText} , status: ${err.status}`);
    };
};

function draw(arrOfObjects) {

    const mappedUsers = arrOfObjects.map((user)=>{
        return getMappedUser(user);
    })
    console.log(mappedUsers);

    //DRAW
};

function getMappedUser (user) {
    const keyValueMappingArray = Object.entries(mapping);
    return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
        const [ key, settingObj ] = KEYVALUEPAIR_ARRAY;
        const { path } = settingObj;
        const isFunction = typeof settingObj[ "fn" ] === 'function';
        return { ...mappedUser, [ key ]: isFunction ? settingObj[ "fn" ](user) : getValueFromPath(path, user) };
    }, {});
};

function getValueFromPath (path, user) {
    if (typeof path !== 'string') return;
    const splittedPath = path.split(".");
    const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
        const isValueExist = currentUser[ partOfPath ];
        return isValueExist ? currentUser[ partOfPath ] : "Not Availble";
    }, user);
    return theRequestedValue;
};



$("#selectOption").on("change",()=>{
    init();
    window.localStorage.setItem("optionValue", $("#selectOption").val());
})