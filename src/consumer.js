const amqp = require('amqplib');
const PlaylistsService = require('./PlaylistsService');
const TracksService = require('./TracksService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const playlistsService = new PlaylistsService();
  const tracksService = new TracksService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, tracksService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  // TODO: Rename the queue
  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
