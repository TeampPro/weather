package com.example.todo_caled.chat.service;

import com.example.todo_caled.chat.dto.ChatMessageDto;
import com.example.todo_caled.chat.dto.ChatRoomDto;
import com.example.todo_caled.chat.dto.ChatRoomResponseDto;
import com.example.todo_caled.chat.entity.ChatMessage;
import com.example.todo_caled.chat.entity.ChatRoom;
import com.example.todo_caled.chat.repository.ChatMessageRepository;
import com.example.todo_caled.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    // 전체방 조회
    public List<ChatRoomResponseDto> findAllRooms() {
        return chatRoomRepository.findAll().stream()
                .map(room -> ChatRoomResponseDto.builder()
                        .id(room.getId())
                        .name(room.getName())
                        .participantCount(room.getParticipantCount())
                        .build())
                .collect(Collectors.toList());
    }

    // 채팅방 생성
    public ChatRoomResponseDto createRoom(String name) {
        String id = UUID.randomUUID().toString();
        ChatRoom room = ChatRoom.builder()
                .id(id)
                .name(name)
                .participantCount(0)
                .build();

        chatRoomRepository.save(room);

        return ChatRoomResponseDto.builder()
                .id(id)
                .name(name)
                .participantCount(0)
                .build();
    }

    // 메시지 저장
    public void saveMessage(ChatMessageDto dto) {
        chatMessageRepository.save(
                ChatMessage.builder()
                        .roomId(dto.getRoomId())
                        .sender(dto.getSender())
                        .message(dto.getMessage())
                        .sentAt(LocalDateTime.now())
                        .build()
        );
    }

    // 특정 채팅방의 이전 메시지 불러오기
    public List<ChatMessageDto> getMessages(String roomId) {
        return chatMessageRepository.findByRoomIdOrderBySentAtAsc(roomId).stream()
                .map(msg -> ChatMessageDto.builder()
                        .roomId(msg.getRoomId())
                        .sender(msg.getSender())
                        .message(msg.getMessage())
                        .time(msg.getSentAt().toString())
                        .build())
                .collect(Collectors.toList());

    }
}
