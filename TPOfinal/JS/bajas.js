//const URL = "http://127.0.0.1:5000/"  
const URL = "https://aguscodo.pythonanywhere.com/"

const app = Vue.createApp({ 
    data() {
        return { 
            platos: [] 
        }
         
    }, 
            
    methods: { 
        obtenerPlatos() { // Obtenemos el contenido del inventario 
            fetch(URL + 'platos') 
                .then(response => {
                    if (response.ok) { 
                        return response.json(); 
                    } else {
                        throw new Error('Error al obtener los platos. Código de respuesta: ' + response.status);
                    }
                }) 
                .then(data => {
                    this.platos = data;
                }) 
                .catch(error => { 
                    console.log('Error:', error);
                    alert('Error al obtener los platos.');
                });
        }, 
        eliminarPlato(codigo) { 
            if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
                fetch(URL + `platos/${codigo}`, { method: 'DELETE' }) 
                    .then(response => {
                        if (response.ok) {
                            this.platos = this.platos.filter(plato => plato.codigo !== codigo); 
                            alert('Plato eliminado correctamente.');
                        } else {
                            throw new Error('Error al eliminar el plato. Código de respuesta: ' + response.status);
                        }
                    }) 
                    .catch(error => { 
                        console.error('Error en la solicitud DELETE:', error);
                        alert('Error al eliminar el plato.');
                    });
            } 
        } 
    }, 
    mounted() { //Al cargar la página, obtenemos la lista de productos 
        this.obtenerPlatos(); 
    } 
}); 
    app.mount('body');