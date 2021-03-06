package cn.stream2000.railgunmq.core;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConnectionMap {

    private static final Map<String, Connection> connections = new ConcurrentHashMap<>();//channel的id与channel的对应

    //这里是根据channel的id获取channel，不是Name
    public static Connection getConnection(String key) {
        return connections.get(key);
    }

    public static void addConnection(Connection connection) {
        connections.put(connection.getChannelId(), connection);//id-----connection对象
    }


    public static List<Connection> getAll() {
        List<Connection> conns = new ArrayList<>();
        conns.addAll(connections.values());
        return conns;
    }


    //根据channel的id删除
    public static void deleteConnection(String channelId) {
        connections.remove(channelId);
    }

}
