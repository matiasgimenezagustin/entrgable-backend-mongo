
/* Me harte de escribir ok: false, lo siento jajaja */
class ErrorsManager {
    constructor(){
        this.errorsList = []
    }
    createError = (content) => {
        this.errorsList.push(content)
        return {ok: false, content}
    }
}


export {ErrorsManager}