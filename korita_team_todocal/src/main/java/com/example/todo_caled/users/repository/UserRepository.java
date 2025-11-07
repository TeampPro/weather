package com.example.todo_caled.users.repository;

import com.example.todo_caled.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsById(String id);  // 엔티티 User의 id 필드 기준
}
