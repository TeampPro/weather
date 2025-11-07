package com.example.todo_caled.chat.controller;

import com.example.todo_caled.chat.dto.ChatMessageDto;
import com.example.todo_caled.chat.dto.ChatRoomDto;
import com.example.todo_caled.chat.dto.ChatRoomRequestDto;
import com.example.todo_caled.chat.dto.ChatRoomResponseDto;
import com.example.todo_caled.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/rooms")
    public List<ChatRoomResponseDto> getRooms() {
        return chatService.findAllRooms();
    }

    @PostMapping("/rooms")
    public ChatRoomResponseDto createRoom(@RequestBody ChatRoomRequestDto request) {
        return chatService.createRoom(request.getName());
    }

    @GetMapping("/rooms/{roomId}/messages")
    public List<ChatMessageDto> getMessages(@PathVariable String roomId) {
        return chatService.getMessages(roomId);
    }
}
