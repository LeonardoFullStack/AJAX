
        const peticion=async(id=1)=>{
            try {
                const ruta;
                const opciones;
                if(){
                    ruta='http/'
                    opciones={}
                }else if(){
                }
                const respuesta=await fetch(ruta,opciones)
                if(respuesta.ok){
                    return {
                        ok:true,
                        respuesta:respuesta.json()
                    }
                }else{
                    throw({
                        ok:false,
                        msg:'xxxxx'
                    })
                }
            } catch (error) {
                return error()
            }
        }
        const pintarXX=async(search)=>{
            const pericion=await peticion(search)
        }
        const pintarUno=async(search)=>{
            const pericion=await peticion(id)
        }
        const pintarBotones=async()=>{
            const {total_pages,total}=await peticion()
        }
