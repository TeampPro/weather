package com.example.todo_caled.config;

import com.example.todo_caled.chat.handler.ChatSoketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class ChatWebSoketConfig implements WebSocketConfigurer {

    private final ChatSoketHandler chatSoketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatSoketHandler, "/ws/chat")
                .setAllowedOrigins("*");     // 임시 개발용 전체 개방
    }
}
