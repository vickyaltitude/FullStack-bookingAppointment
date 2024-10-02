let tbody = document.getElementById('body-data');

async function getData() {
    try{
        let dataUsers = await axios.get('http://localhost:4000/users');
        let convertedData = dataUsers.data;
        convertedData.forEach(user => {
            let row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.phone}</td>
                    <td>${user.email}</td>
                    <td>${user.slot}</td>
                    <td>Confirmed</td>
                    <td class="edit"><button type="button">Edit Slot</button></td>
                    <td class="delete"><button type="button">Delete Slot</button></td>
                </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });
    }catch(err){
        console.log(err)
    }
   
}

getData();