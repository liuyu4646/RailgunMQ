package cn.stream2000.railgunmq.producer.spring.service;

import cn.stream2000.railgunmq.core.ProducerMessage;
import cn.stream2000.railgunmq.producer.RailgunMQConnection;

/**
 * @program: RailgunMQ
 * @description:
 * @author: Yu Liu
 * @create: 2020/07/07
 **/
public class ProducerService {

    private String Host="";
    private int Port=9999;
    private String channelName=null;
    private RailgunMQConnection conn=null;

    private ProducerService (){

    }
    private static class Singleton{
        private final static ProducerService instance=new ProducerService ();
    }
    public static ProducerService getInstance(){
        return Singleton.instance;
    }

    public static void setHost(String host) {
        getInstance().Host = host;
    }

    public static void setPort(int port) {
        getInstance().Port = port;
    }
    public static void connect() throws InterruptedException {
        if(getInstance().channelName==null)
            getInstance().conn=new RailgunMQConnection(getInstance().Host,getInstance().Port);
        else
            getInstance().conn=new RailgunMQConnection(getInstance().Host,getInstance().Port,getInstance().channelName);
        ProducerMessage.PubMessageAck pubMessageAck= ProducerMessage.PubMessageAck.newBuilder().setErrorMessage("HELLO").build();

    }
    public static void setChannelName(String name){
        if(getInstance().conn==null)
            getInstance().channelName=name;
        else
            getInstance().conn.SetChannelName(name);
    }
    public static void publish(String topic,String content){
        getInstance().conn.Publish(topic,content);

    }
    public static void disconnect(){
        getInstance().conn.Disconnect();
    }


}