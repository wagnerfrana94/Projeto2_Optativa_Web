
import { Mongo } from 'meteor/mongo';

Filmes = new Mongo.Collection("filmes");
Cadastro = new Mongo.Collection("cadastro");
Reservas = new Mongo.Collection("reservas");
Login = new Mongo.Collection("login");




Filmes.allow({
	insert:function(){

        return true;
    },
	remove:function(){
        return true;  
    },
    update:function(userId){
        return (userId != null);
    }

});

Cadastro.allow({
    insert:function(){

        return true;
    },
    remove:function(){
        return true;  
    },

    update:function(){
        return true;
    }

});

Reservas.allow({
    insert:function(){

        return true;
    },
    remove:function(){
        return true;  
    },

    update:function(){
        return true;
    }

});

Login.allow({
    
    

    insert:function(){

        return true;
    },
    
    remove:function(){
        return true;  
    },


    update:function(){
        return true;
    }
});


/*

    Filmes.insert({cod_filme: "01", nome_filme: "Filme 1", ano_filme: "2017", genero_filme: "Terror", created: new Date()});
    Filmes.insert({cod_filme: "02", nome_filme: "Filme 2", ano_filme: "2017", genero_filme: "Ação", created: new Date()});
    Filmes.insert({cod_filme: "03", nome_filme: "Filme 3", ano_filme: "2017", genero_filme: "Aventura", created: new Date()});
    Filmes.insert({cod_filme: "04", nome_filme: "Filme 4", ano_filme: "2017", genero_filme: "Terror", created: new Date()});
 
 */
