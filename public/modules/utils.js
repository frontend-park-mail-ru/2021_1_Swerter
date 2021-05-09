const getFileFromUser = () => {
    return new Promise(resolve => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const reader = new FileReader();

            const file = input.files[0];
            reader.onload = (event) => {
                const url = event.target.result;
                resolve({file, url});
            };

            reader.readAsDataURL(file);
        };

        input.click();
    });
};

const getApp = () => document.getElementById('app');

export {getFileFromUser, getApp};
