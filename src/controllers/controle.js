
module.exports = class controle {
    
    static home (req , res){
        res.render ('home')
    }

    static cadastro (req , res){
        res.render ('cadastro')
    }

    static login (req , res){
        res.render ('login')
    }
}