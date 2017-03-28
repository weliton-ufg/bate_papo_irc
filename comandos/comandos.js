// comandos.js

//FUNÇÃO NICK
exports.NICK = function (args, socket, nicks, retorno) {
    var flagMudandoNick = false;
    var nomeTemporario;
    if (!args[1]) {
        socket.write("ERRO:comando NINCK incompleto\n");
        return;
    } else if (nicks[args[1]]) {//VERIFICAR SE O NICK JA EXISTE
        console.log(nicks);
        socket.write("ERRO: Nickname Já existe\n");
        return;
    }
    else {
        if (socket.nick) {
            //CASO O USÚARIO JÁ TENHA NICK FAÇO A SUBSTITUIÇÃO
            nomeTemporario = socket.nick;
            delete nicks[socket.nick];
            flagMudandoNick = true;
            retorno.push(flagMudandoNick);
            retorno.push(nomeTemporario);
        }
        nicks[args[1]] = socket.name;
        socket.nick = args[1];
    }
    return retorno;
};

//FUNÇÃO USER
exports.USER = function () {
    //  return ;
};

exports.JOIN = function (){

};

