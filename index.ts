import { rastrearEncomenda } from "./helpers/tracking";

const correios = require('correios-rastreamento')

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');

const client = new Client({
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
    authStrategy: new LocalAuth(),
  });
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    agendarRastreamento();
    
});
function agendarMensagens() {
    const horarios = ['25 6 * * *', '25 10 * * *', '25 14 * * *', '25 18 * * *', '25 22 * * *', '25 2 * * *'];

    horarios.forEach((horario) => {
        schedule.scheduleJob(horario, function () {
            enviarMensagem();
        });
    });
}
let lastStatus = '';
function agendarRastreamento() {
    schedule.scheduleJob('*/5 * * * *', function () { 
        correios.sroV2.rastrearObjeto('OY005099174BR').then(function(res){
            const dateString = res.status_list[res.status_list.length -1].data;
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2,

client.on('qr', (qr) => { '0');

            const formattedDate = `${day}/${month} ${hours}:${minutes}`;
            const numeroDestino = '+553399928825';
            const chatId = numeroDestino.substring(1) + "@c.us";
            const statusAtual = res.status_list[res.status_list.length - 1].data;
            if (statusAtual !== lastStatus && lastStatus !== '') {
                lastStatus = statusAtual;
                const mensagem: string = '*Alteração detectada!!*' + '\n' + 'Saiu de: ' + res.status_list[res.status_list.length -1].origem + '\n' + 'Para: ' + res.status_list[res.status_list.length -1].destino + '\n' + 'Em: ' + formattedDate
                client.sendMessage(chatId, mensagem).then(() => {
                    console.log('Mensagem enviada com sucesso!');
                }).catch((err) => {
                    console.error('Erro ao enviar mensagem:', err);
                });
            }else{
                lastStatus = statusAtual;
                console.log('sem alterção detectada',statusAtual , lastStatus)
            }

            
        })
    });
}

function enviarMensagem() {
    const numeroDestino = '+553399928825';
    const chatId = numeroDestino.substring(1) + "@c.us";
    const mensagem = 'toma a agua';

    client.sendMessage(chatId, mensagem).then(() => {
        console.log('Mensagem enviada com sucesso!');
    }).catch((err) => {
        console.error('Erro ao enviar mensagem:', err);
    });
}

client.on('message', msg => {
    if (msg.body == '!rastrear') {
        correios.sroV2.rastrearObjeto('OY005099174BR').then(function(res){
            const dateString = res.status_list[res.status_list.length -1].data;
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            const formattedDate = `${day}/${month} ${hours}:${minutes}`;
            msg.reply('Saiu de: ' + res.status_list[res.status_list.length -1].origem + '\n' + 'Para: ' + res.status_list[res.status_list.length -1].destino + '\n' + 'Em: ' + formattedDate);
        })
        
    }
});

client.on('message_create', (msg) => {
    if (msg.fromMe) {
        if (msg.body == '!rastrear') {
            correios.sroV2.rastrearObjeto('OY005099174BR').then(function(res){
                console.log(res.status_list[res.status_list.length -1])
                const dateString = res.status_list[res.status_list.length -1].data;
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const formattedDate = `${day}/${month} ${hours}:${minutes}`;
                msg.reply('Saiu de: ' + res.status_list[res.status_list.length -1].origem + '\n' + 'Para: ' + res.status_list[res.status_list.length -1].destino + '\n' + 'Em: ' + formattedDate);
            })
        }
    }
    });

client.initialize();