db.collection('Roles').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data)
    })
})