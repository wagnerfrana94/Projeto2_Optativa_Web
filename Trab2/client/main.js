import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

//import '../imports/banco.js';


import './main.html';





Router.configure({
   	layoutTemplate: 'principal',
   	layoutTemplate: 'principal2',
   	layoutTemplate: 'principal6',
   	layoutTemplate: 'tela_cadastro',
   	layoutTemplate: 'tela_login',
   	layoutTemplate: 'tela_reservas'
		   	
});




Router.route('/', function () {
	this.layout('principal');
	this.render('navbar', { to: "topo"});
  	this.render('slides', { to: "slide"});
  	this.render('rodape', { to: "rodape"});
});



Router.route('/filmes', function () {
  	this.layout('principal2');
 	this.render('navbar', { to: "topo2"});
 	this.render('tabela_filmes', { to: "lista_filmes"});
 	this.render('rodape', { to: "rodape2"});
});

Router.route('/contatos', function () {
  	this.layout('principal6');
 	this.render('navbar', { to: "topo6"});
 	this.render('contatos', { to: "contatos"});
 	this.render('rodape', { to: "rodape6"});
});

Router.route('/cadastro', function () {
  	this.layout('tela_cadastro');
 	this.render('navbar', { to: "topo7"});
 	this.render('cadastro', { to: "cad"});
 	this.render('rodape', { to: "rodape7"});
});

Router.route('/login_reservas', function () {
  	this.layout('tela_login');
 	this.render('navbar', { to: "topo8"});
 	this.render('login', { to: "login"});
 	this.render('rodape', { to: "rodape8"});
});

Router.route('/reservas', function () {
	
  		this.layout('tela_reservas');
 		this.render('nav_reservas', { to: "navreservas"});
 	
});



var img_principal = [
		{	
			link: "https://www.youtube.com/watch?v=iUJXje976RM",
			src : "rei.jpg",
			title : "Rei Arthur", 
			alt : "Imagem do Filme Rei Arthur"
		}
];

var img_data = [
		 
		{	
			link : "https://youtu.be/LnH_qWviqis",
			src: "pr.jpg",
			title : "Power Rangers 2017", 
			alt: "Imagem do filme Power Rangers 2017"
		}, 
		{	
			
			link : "https://youtu.be/KvSlvtPnZTo",
			src: "velozes8.jpg",
			title : "Velozes e Furiosos 8", 
			alt: "Imagem do Filme Velozes e Furiosos 8"
		}, 
		{	
			
			link : "https://youtu.be/KPND6SgkN7Q",
			src: "logan.jpg",
			title : "Logan", 
			alt: "Imagem do Filme Logan"
		} 
	];

Template.slides.helpers({
	vetorImagens: img_data,
	vetorImagensCapa :img_principal
});

Template.tabela_filmes.helpers({

	//vetorFilmes:Filmes.find({}, {sort:{createdOn: -1}}),

	vetorFilmes: function() {
       	var nome = $("#myInput").val();
        if(Session.get("pesquisaFilme") && nome.length > 0){
        	
            return Filmes.find({nome_filme : nome});
        }
        else {
            return Filmes.find({}, {sort:{createdOn: -1}});
        }
    }


});	

Template.tabela_filmes.events({
	'keyup #myInput': function(event){
		Session.set("pesquisaFilme", true);
		
	},
	'keydown #myInput': function(event){
		Session.set("pesquisaFilme", false);
	
	}


}); 


Template.login.events({

	'submit .formReserva': function(event){

		var testa = Cadastro.find({email: event.target.email.value, senha: event.target.senha.value}).count()
		

		if(testa > 0){
			t = Login.find({}, {sort:{createdOn: -1}}).count();
			
			if( t > 0){
				const dados = Login.find({}, {limit: 1}); 
				dados.forEach((login) => {
  					
					Login.remove({"_id": login._id});
  					
  					
				});


			}	
			Login.insert({user: event.target.email.value});

			$(".formReserva").attr("action", "/reservas");
			

   		}else{
   			alert("Usuário Inválido !");
   		}
   	}


});





Template.cadastro.events({

	'submit #formCadastro': function(event){

		var e = Cadastro.find({email: event.target.email.value}).count()
		var c = Cadastro.find({email: event.target.cpf.value}).count()
		var s = Cadastro.find({email: event.target.senha.value}).count()

		if(e==0 && c==0 && s==0){
			Cadastro.insert({nome: event.target.nome.value, cpf: event.target.cpf.value, email: event.target.email.value, tel: event.target.tel.value, senha: event.target.senha.value, created: new Date()});        
   			
   		}else{
   			alert("Já possui Usuário com Esses Dados !");
   		}
   	}


});

Template.cadastro.onRendered( function() {
	$("#formCadastro").validate({
		rules : {
			nome:{
			required:true

			},
			cpf:{
				required:true,
				number:true,
				rangelength:[11,11]
				
				
			},

		email:{
			email:true
	 	},
			
			tel:{
			required:true,
			number: true,
			rangelength:[10,11]

			},
			login:{
				required:true,
				rangelength:[6,6]
			},

			senha:{
				required:true,
				rangelength:[6,6]
			}                                
		},
		messages:{
			nome:{
			required:"Por favor, informe seu nome"

			},
			cpf:{
				required:"Por favor, informe seu CPF",
				rangelength:"Por favor, informe os 11 dígitos de seu CPF",
				number:"Por favor, informe os 11 dígitos de seu CPF. Somente números."
			},

			email:{
			required:"É necessário informar um email",
			email:"É necessário informar um email válido"
			},
			
			tel:{
			required:"É necessário informar um telefone celular",
			number:"Informe somente números. 11 números, incluindo DDD",
			rangelength:"Informe um telefone celular. 11 números, incluindo DDD"
			},     
				
			senha:{
				required:"Por favor, informe uma senha",
				rangelength:"Por favor, informe uma senha com 6 dígitos"
			}	


		}

	});


});


Template.nav_reservas.helpers({
		

	dadosCadastroEditar : function() {
		const d = Login.find({}, {limit: 1});
		var u;
		
		d.forEach((login) => {
  			u = login.user;
  				
		});
		return Cadastro.find({email : u});

	},
		
	vetorFilmesReservados : function() {
		const d = Login.find({}, {limit: 1});
		var u;
		
		d.forEach((login) => {
  			u = login.user;
  				
		});
		return Reservas.find({email : u});
	},
		
	vetorFilmes: function() {
       	var nome = $("#myInput").val();
        if(Session.get("pesquisaFilme") && nome.length > 0){
        	
            return Filmes.find({nome_filme : nome});
        }
        else {
            return Filmes.find({}, {sort:{createdOn: -1}});
        }
    }

});	

Template.nav_reservas.events({


	'click #editarCadastro': function(event){	
    	$("#exampleModal").modal('show');	
    },

    'submit .editCadastro': function(event){
    	const d = Login.find({}, {limit: 1});
		var u;
		
		d.forEach((login) => {
  			u = login.user;
  				
		});

		const pega_id = Cadastro.find({email : u}, {limit: 1});
		var id;
		
		pega_id.forEach((cadastro) => {
  			id = cadastro._id;
  				
		}); 
    	
    	Cadastro.update({_id: id}, {$set:{tel: event.target.tel.value, senha: event.target.senha.value}});

    },

    'keyup #myInput': function(event){
		Session.set("pesquisaFilme", true);
		
	},
	'keydown #myInput': function(event){
		Session.set("pesquisaFilme", false);
	
	},

	'click .fechaTabela': function(event){
		$(".tableReserva").hide();
	},

	'click .fazerReserva':function(event){
		$(".tableReserva").toggle();
	},

	'click .btnCarrinho':function(event){
		$(".tableReservaAdd").toggle();
	},

	'click .fechaTabelaReservas':function(event){
		$(".tableReservaAdd").hide();
	},

	'click .reservarFilme' : function(event){
		const d = Login.find({}, {limit: 1});
		var u;
		
		d.forEach((login) => {
  			u = login.user;
  				
		});

		var dados = []; 

		_tr = $(event.currentTarget).parent().parent()[0];

    	dados.push(_tr.cells[0].innerHTML,_tr.cells[1].innerHTML,_tr.cells[2].innerHTML, _tr.cells[3].innerHTML);
    	

        Reservas.insert({email: u, cod_filme: dados[0], nome_filme: dados[1], ano: dados[2], genero: dados[3], created: new Date()});

     	const f = Filmes.find({cod_filme: dados[0]}); 
		f.forEach((filmes) => {		
			Filmes.remove({"_id": filmes._id});
  								
		});
	   
	},
	'click .excluirReserva': function(event){
		var dados2 = []; 

		_tr = $(event.currentTarget).parent().parent()[0];

    	dados2.push(_tr.cells[0].innerHTML,_tr.cells[1].innerHTML,_tr.cells[2].innerHTML, _tr.cells[3].innerHTML);
    	

    	Filmes.insert({cod_filme: dados2[0], nome_filme: dados2[1], ano_filme: dados2[2], genero_filme: dados2[3], created: new Date()});

     	const film = Reservas.find({cod_filme: dados2[0]}); 
		film.forEach((reservas) => {		
			Reservas.remove({"_id": reservas._id});
  								
		});
	},
	'click .sairLogin':function(event){
		const d = Login.find({}, {limit: 1});
		var u;
		
		d.forEach((login) => {
  			u = login._id;
  				
		});
		
		Login.remove({"_id": u});

		$(".sairLogin").attr("href", "/");
	},
	'click .trocarLogin': function(event){
		const d = Login.find({}, {limit: 1});
		var u;
		
		d.forEach((login) => {
  			u = login._id;
  				
		});
		
		Login.remove({"_id": u});
		
		$(".trocarLogin").attr("href", "/login_reservas");
	}


});

Meteor.startup(function () {
 		
	$(".tableReserva").hide();
 	$(".cadErro").hide();

});

Template.cadastro.helpers({
	emailUsuario:function(){
		if(Meteor.user().services.facebook){
			return Meteor.user().services.facebook.email;
		}else{
			return "";
		}

	},
	nomeUsuario:function(){
		if(Meteor.user().services.facebook){
			return Meteor.user().services.facebook.name;
		}else{
			return "";
		}

	}

	

});	


