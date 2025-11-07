package com.example.todo_caled.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/ws/**", "/api/**"))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll()     // REST허용
                        .requestMatchers("/ws/**").permitAll()      // WebSoket 허용
                        .anyRequest().permitAll() // ✅ 전체 오픈 (테스트용)
                )
                .formLogin(login -> login.disable()) // ✅ 로그인폼 비활성화
                .httpBasic(basic -> basic.disable()); // ✅ HTTP Basic도 끄기

        return http.build();
    }
}