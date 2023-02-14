const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    {
        method : 'GET',
        path : '/hello/{name?}',
        handler : (request, h)=>{
            //memanfaatkan object destructing untuk mendapatkan nilai 
            //memberikan default  = strangers

            const { name = 'Stranger'} = request.params
            const { lang} = request.query //memasukkan query parameter
            return `Hello ${name}!`
            //masukkan curl -X GET http://localhost:5000/hello/name
        }
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];
//tanda * pada method untuk dapat diakses menggunakan seluruh method pada http
//nilai any* terakhir berfungsi menangani permintaaan masuk pada path yang belum ditentukan
module.exports = routes;
