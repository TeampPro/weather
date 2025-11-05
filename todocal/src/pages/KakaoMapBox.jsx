import React, { useEffect, useState } from "react";
import "../styles/KakaoMapBox.css";

function KakaoMapBox() {
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ✅ 이미 kakao 객체가 존재하면 재로딩 방지
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    // ✅ 스크립트 중복 방지
    const existingScript = document.getElementById("kakao-map-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", initMap);
      return;
    }

    // ✅ SDK 로드
    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    // ⚠️ 본인 JavaScript 키 (카카오 개발자 콘솔의 “JavaScript 키”)
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=003886aac0beda9c1fe23ae6ece8b689&autoload=false&libraries=services";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(initMap);
      }
    };

    script.onerror = () => {
      console.error("❌ Kakao Maps SDK 로드 실패 — 도메인 등록을 확인하세요.");
    };
  }, []);

  // ✅ 지도 초기화 함수
  const initMap = () => {
    const container = document.getElementById("mapBox");
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
      level: 3,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    setMap(createdMap);
  };

  // 🔍 검색 기능
  const handleSearch = (e) => {
    e.preventDefault();
    if (!map || !search.trim()) return;

    if (!window.kakao?.maps?.services) {
      alert("지도가 아직 완전히 로드되지 않았습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(search, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const first = data[0];
        const moveLatLon = new window.kakao.maps.LatLng(first.y, first.x);
        map.setCenter(moveLatLon);

        const marker = new window.kakao.maps.Marker({
          map,
          position: moveLatLon,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${first.place_name}</div>`,
        });
        infowindow.open(map, marker);
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  return (
    <div className="map-container">
      <h3 className="map-title">📍 약속 위치 검색</h3>

      <form onSubmit={handleSearch} className="map-search-form">
        <input
          type="text"
          placeholder="장소를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="map-input"
        />
        <button type="submit" className="map-btn">
          검색
        </button>
      </form>

      <div id="mapBox" className="map-box"></div>
    </div>
  );
}

export default KakaoMapBox;
