// ⭐ DOMContentLoaded 이벤트 리스너 시작
document.addEventListener('DOMContentLoaded', function() {

    // 🗺️ 공항 데이터 (34개)
    const airportData={
      'Seoul':{code:'ICN',name:'Incheon International Airport',lat:37.4602,lon:126.4407, tzOffset: 9},
      'Gimpo':{code:'GMP',name:'Gimpo International Airport',lat:37.5583,lon:126.7905, tzOffset: 9}, 
      'Jeju':{code:'CJU',name:'Jeju International Airport',lat:33.5115,lon:126.4928, tzOffset: 9},
      'Busan':{code:'PUS',name:'Gimhae International Airport',lat:35.1764,lon:128.9377, tzOffset: 9},
      'New York':{code:'JFK',name:'John F. Kennedy International Airport',lat:40.6413,lon:-73.7781, tzOffset: -5},
      'London':{code:'LHR',name:'London Heathrow Airport',lat:51.4700,lon:-0.4543, tzOffset: 0},
      'Tokyo':{code:'NRT',name:'Narita International Airport',lat:35.773,lon:140.3929, tzOffset: 9},
      'Sydney':{code:'SYD',name:'Sydney Kingsford Smith Airport',lat:-33.9461,lon:151.1772, tzOffset: 10},
      'Paris':{code:'CDG',name:'Charles de Gaulle Airport',lat:49.0097,lon:2.5479, tzOffset: 1},
      'Frankfurt':{code:'FRA',name:'Frankfurt Airport',lat:50.0379,lon:8.5622, tzOffset: 1},
      'Hong Kong':{code:'HKG',name:'Hong Kong International Airport',lat:22.3080,lon:113.9185, tzOffset: 8},
      'Singapore':{code:'SIN',name:'Changi Airport Singapore',lat:1.3592,lon:103.9892, tzOffset: 8},
      'Dubai':{code:'DXB',name:'Dubai International Airport',lat:25.2532,lon:55.3656, tzOffset: 4},
      'LA':{code:'LAX',name:'Los Angeles International Airport',lat:33.9416,lon:-118.4004, tzOffset: -8},
      'Vancouver':{code:'YVR',name:'Vancouver International Airport',lat:49.1939,lon:-123.1842, tzOffset: -8},
      'Seattle':{code:'SEA',name:'Seattle–Tacoma International Airport',lat:47.4502,lon:-122.3088, tzOffset: -8},
      'Dallas':{code:'DFW',name:'Dallas/Fort Worth International Airport',lat:32.8998,lon:-97.0403, tzOffset: -6},
      'Mexico City':{code:'MEX',name:'Mexico City International Airport',lat:19.4363,lon:-99.0721, tzOffset: -6},
      'Sao Paulo':{code:'GRU',name:'São Paulo/Guarulhos Airport',lat:-23.4356,lon:-46.4731, tzOffset: -3},
      'Buenos Aires':{code:'EZE',name:'Ministro Pistarini International Airport',lat:-34.8222,lon:-58.5358, tzOffset: -3},
      'Cairo':{code:'CAI',name:'Cairo International Airport',lat:30.1219,lon:31.3986, tzOffset: 2},
      'Moscow':{code:'SVO',name:'Sheremetyevo International Airport',lat:55.9726,lon:37.4146, tzOffset: 3},
      'Istanbul':{code:'IST',name:'Istanbul Airport',lat:41.2599,lon:28.7292, tzOffset: 3},
      'Beijing':{code:'PEK',name:'Beijing Capital International Airport',lat:40.0722,lon:116.5975, tzOffset: 8},
      'Shanghai':{code:'PVG',name:'Shanghai Pudong International Airport',lat:31.1434,lon:121.8053, tzOffset: 8},
      'Taipei':{code:'TPE',name:'Taiwan Taoyuan International Airport',lat:25.0777,lon:121.2325, tzOffset: 8},
      'Bangkok':{code:'BKK',name:'Suvarnabhumi Airport',lat:13.6811,lon:100.7471, tzOffset: 7},
      'Ho Chi Minh':{code:'SGN',name:'Tan Son Nhat International Airport',lat:10.8189,lon:106.6517, tzOffset: 7},
      'Manila':{code:'MNL',name:'Ninoy Aquino International Airport',lat:14.5085,lon:121.0192, tzOffset: 8},
      'Dubai-Maktoum':{code:'DWC',name:'Al Maktoum International Airport',lat:24.8967,lon:55.1769, tzOffset: 4},
      'Jeddah':{code:'JED',name:'King Abdulaziz International Airport',lat:21.7088,lon:39.1554, tzOffset: 3},
      'Madrid':{code:'MAD',name:'Adolfo Suárez Madrid–Barajas Airport',lat:40.4936,lon:-3.5668, tzOffset: 1},
      'Amsterdam':{code:'AMS',name:'Amsterdam Airport Schiphol',lat:52.3105,lon:4.7683, tzOffset: 1},
      'Oslo':{code:'OSL',name:'Oslo Airport, Gardermoen',lat:60.1939,lon:11.1004, tzOffset: 1}
    };

    // 🗺️ Leaflet 관련 전역 변수
    let map;
    let flightPath;
    let planeMarker;
    let departureMarker;
    let arrivalMarker;
    let currentTileLayer; // 현재 활성화된 지도 레이어를 추적

    // ⏱️ 비행 시뮬레이션 관련 변수
    let currentFlight = null; // 현재 비행 상태 객체
    let animationFrameId; // requestAnimationFrame ID
    let isFollowing = true; // 지도 중앙이 비행기를 따라가는지 여부
    let isFlightActive = false; // 비행 중 상태 (타이머 중단 여부 판단)

    // 💰 사용자 데이터 관련 변수
    let userMoney = parseInt(localStorage.getItem('focusFlightMoney')) || 0;
    let userName = localStorage.getItem('focusFlightUserName') || null;
    let focusTime = 0; // 초 단위

    // 🗺️ 지도 스타일 정의
    const mapStyles = {
        'satellite': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 1,
            maxZoom: 18
        }),
        '2d': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 1,
            maxZoom: 18
        }),
        // 👈 'dark2d' 스타일 추가 (Dark Mode Tile Layer, Stadia Smooth Dark)
        'dark2d': L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        })
    };

    // ----------------------------------------------------
    // 🗺️ 지도 관련 함수
    // ----------------------------------------------------

    // 🗺️ 지도 초기화
    function initializeMap() {
        // 1. 현재 저장된 스타일을 불러옵니다.
        const currentStyle = loadMapStyle(); // 'satellite', '2d', 또는 'dark2d' 중 하나

        // 2. 지도 생성 및 레이어 추가
        map = L.map('map', {
            center: [37.5665, 126.9780],
            zoom: 2,
            layers: [mapStyles[currentStyle]], // 👈 currentStyle을 사용하여 초기 레이어 설정
            worldCopyJump: true // 경도 -180, 180 경계에서 지도가 끊기지 않도록 설정
        });
        currentTileLayer = mapStyles[currentStyle];

        // 3. body 클래스 업데이트
        document.body.className = `map-style-${currentStyle}`;

        // 4. 지도 이동 이벤트 리스너 추가 (Follow 모드 해제)
        map.on('dragstart', function() {
            if (isFlightActive) {
                setFollowing(false);
            }
        });

        // 5. 공항 선택 리스트 초기화
        populateAirportList();
    }

    // 🗺️ 지도 스타일 설정 및 저장
    function setMapStyle(style) {
        if (currentTileLayer) {
            map.removeLayer(currentTileLayer);
        }
        
        // 새 스타일 적용
        currentTileLayer = mapStyles[style];
        currentTileLayer.addTo(map);

        // body 클래스 업데이트 및 LocalStorage 저장
        document.body.className = `map-style-${style}`; // 👈 ${style} 변수 사용
        localStorage.setItem('focusFlightMapStyle', style);

        // 설정 모달 버튼의 active 상태 업데이트
        document.querySelectorAll('.map-style-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.style === style) {
                btn.classList.add('active');
            }
        });

        // 맵 뷰를 유지하기 위해 무효화
        map.invalidateSize();
    }

    // 🗺️ LocalStorage에서 지도 스타일 불러오기
    function loadMapStyle() {
        // 'satellite'를 기본값으로 사용
        const savedStyle = localStorage.getItem('focusFlightMapStyle');
        // 👈 dark2d를 포함하여 유효한 스타일인지 확인
        if (['satellite', '2d', 'dark2d'].includes(savedStyle)) {
            return savedStyle;
        }
        return 'satellite'; // 유효하지 않거나 없을 경우 기본값
    }

    // 🗺️ 지도 Follow 모드 설정
    function setFollowing(follow) {
        isFollowing = follow;
        const btn = document.getElementById('followToggleBtn');
        if (follow) {
            btn.innerHTML = '🎯'; // 따라가기 활성화
            if (planeMarker) {
                map.panTo(planeMarker.getLatLng(), { animate: true, duration: 0.5 });
            }
        } else {
            btn.innerHTML = '🌍'; // 자유 이동
        }
    }

    // ----------------------------------------------------
    // 📍 공항 선택 및 UI 함수
    // ----------------------------------------------------

    // 📍 공항 리스트 UI 채우기
    function populateAirportList() {
        const departureSelect = document.getElementById('departureSelect');
        const arrivalList = document.getElementById('arrivalList');

        // 출발지 드롭다운 채우기
        const airportNames = Object.keys(airportData).sort();
        airportNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = `${name} (${airportData[name].code})`;
            departureSelect.appendChild(option);
        });
        // 기본값 설정 (Seoul)
        departureSelect.value = 'Seoul'; 
        
        // 도착지 리스트는 나중에 채워지므로 현재 비워둡니다.
        updateArrivalList();
    }

    // 📍 도착지 목록 UI 업데이트
    function updateArrivalList() {
        const departureName = document.getElementById('departureSelect').value;
        const arrivalList = document.getElementById('arrivalList');
        arrivalList.innerHTML = ''; // 기존 목록 초기화
        
        const airportNames = Object.keys(airportData).sort();
        airportNames.forEach(name => {
            if (name !== departureName) {
                const item = document.createElement('div');
                item.className = 'arrival-item';
                item.dataset.name = name;
                item.textContent = `${name} (${airportData[name].code})`;
                
                // 거리 정보 추가
                const dep = airportData[departureName];
                const arr = airportData[name];
                const distanceKm = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);
                item.innerHTML += `<span style="float:right; color:var(--color-primary);">${distanceKm.toLocaleString()} km</span>`;

                item.addEventListener('click', () => selectArrival(item));
                arrivalList.appendChild(item);
            }
        });

        // 목록 표시
        arrivalList.style.display = 'block';
        document.getElementById('selectedFlightInfo').style.display = 'none';
        document.getElementById('confirmSelectionBtn').disabled = true;
    }

    // 📍 도착지 선택 처리
    function selectArrival(item) {
        // 모든 선택 해제
        document.querySelectorAll('.arrival-item').forEach(i => i.classList.remove('selected-arrival'));
        
        // 선택 적용
        item.classList.add('selected-arrival');
        
        // 비행 정보 표시
        displaySelectedFlightInfo(item.dataset.name);
        document.getElementById('confirmSelectionBtn').disabled = false;
    }

    // 📍 선택된 비행 정보 표시
    function displaySelectedFlightInfo(arrivalName) {
        const departureName = document.getElementById('departureSelect').value;
        const infoDiv = document.getElementById('selectedFlightInfo');
        const dep = airportData[departureName];
        const arr = airportData[arrivalName];

        const distanceKm = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);
        
        // 비행 시간 및 돈 계산 (Focus Mode에 따라 달라지므로, 여기서는 기본 시간만)
        const baseFlightTimeMin = Math.round(distanceKm / 800) * 60; // 시속 800km 기준 (초 단위)

        infoDiv.innerHTML = `
            <div class="flight-subtitle">✈️ ${dep.code} ➔ ${arr.code}</div>
            <div><span class="flight-subtitle">거리:</span> ${distanceKm.toLocaleString()} km</div>
            <div><span class="flight-subtitle">예상 소요 시간:</span> ${formatTime(baseFlightTimeMin)}</div>
            <div id="selectedSeatClassInfo"></div>
        `;
        
        infoDiv.style.display = 'flex';
        
        // 맵에 마커 표시
        addFlightMarkers(dep, arr);
    }

    // 📍 지도에 출발지/도착지 마커 추가
    function addFlightMarkers(dep, arr) {
        // 기존 마커 제거
        if (departureMarker) map.removeLayer(departureMarker);
        if (arrivalMarker) map.removeLayer(arrivalMarker);
        
        // 출발지 마커
        const depIcon = L.divIcon({ 
            className: 'airport-marker-icon departure', 
            html: `🛫 ${dep.code}`, 
            iconSize: [40, 20], 
            iconAnchor: [20, 10] 
        });
        departureMarker = L.marker([dep.lat, dep.lon], { icon: depIcon }).addTo(map);

        // 도착지 마커
        const arrIcon = L.divIcon({ 
            className: 'airport-marker-icon arrival', 
            html: `🛬 ${arr.code}`, 
            iconSize: [40, 20], 
            iconAnchor: [20, 10] 
        });
        arrivalMarker = L.marker([arr.lat, arr.lon], { icon: arrIcon }).addTo(map);

        // 경로에 맞게 맵 뷰 조정
        const bounds = L.latLngBounds(L.latLng(dep.lat, dep.lon), L.latLng(arr.lat, arr.lon));
        map.fitBounds(bounds, { padding: [100, 100], maxZoom: 6 });
    }

    // ----------------------------------------------------
    // ⚙️ 설정/모달/이벤트 처리 함수
    // ----------------------------------------------------

    // ⚙️ 모달 열기/닫기
    function openModal(id) {
        document.getElementById(id).style.display = 'flex';
    }
    function closeModal(id) {
        document.getElementById(id).style.display = 'none';
    }

    // ⚙️ 설정 모달 열기
    document.getElementById('settingsBtn').addEventListener('click', () => openModal('settingsModal'));
    document.getElementById('closeSettingsModalBtn').addEventListener('click', () => closeModal('settingsModal'));

    // ⚙️ 상점 모달 열기
    document.getElementById('shopBtn').addEventListener('click', () => openModal('shopContainer'));
    document.getElementById('closeShopBtn').addEventListener('click', () => closeModal('shopContainer'));

    // ⚙️ 기록 모달 열기/닫기
    document.getElementById('recordsBtn').addEventListener('click', () => { 
        loadRecords(); 
        document.getElementById('recordsContainer').style.display = 'block'; 
    });
    document.getElementById('closeRecordsBtn').addEventListener('click', () => { 
        document.getElementById('recordsContainer').style.display = 'none'; 
    });
    
    // ⚙️ 추세 모달 열기/닫기
    document.getElementById('trendsBtn').addEventListener('click', () => { 
        loadTrends(); 
        document.getElementById('trendsContainer').style.display = 'block'; 
    });
    document.getElementById('closeTrendsBtn').addEventListener('click', () => { 
        document.getElementById('trendsContainer').style.display = 'none'; 
    });
    
    // ⚙️ 초기 이름 설정 모달 처리
    function loadUserName() {
        if (!userName) {
            openModal('nameModal');
        } else {
            document.getElementById('greetingText').textContent = `${userName} 기장님, 환영합니다!`;
        }
        updateMoneyDisplay();
    }
    
    // ⚙️ 이름 저장 버튼 이벤트
    document.getElementById('saveNameBtn').addEventListener('click', function() {
        const input = document.getElementById('userNameInput');
        const newName = input.value.trim();
        if (newName) {
            userName = newName;
            localStorage.setItem('focusFlightUserName', userName);
            document.getElementById('greetingText').textContent = `${userName} 기장님, 환영합니다!`;
            closeModal('nameModal');
        } else {
            alert('이름을 입력해주세요!');
        }
    });

    // ⚙️ 지도 스타일 버튼 이벤트 리스너
    document.querySelectorAll('.map-style-button').forEach(button => {
        button.addEventListener('click', function() {
            setMapStyle(this.dataset.style);
        });
    });

    // ⚙️ 출발지 변경 시 도착지 목록 업데이트
    document.getElementById('departureSelect').addEventListener('change', updateArrivalList);

    // ⚙️ Follow/Unfollow 버튼 이벤트
    document.getElementById('followToggleBtn').addEventListener('click', () => setFollowing(!isFollowing));
    
    // ⚙️ 초기화 시 지도 스타일 버튼의 active 상태 설정
    const initialStyle = loadMapStyle();
    document.querySelectorAll('.map-style-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.style === initialStyle) {
            btn.classList.add('active');
        }
    });

    // ----------------------------------------------------
    // 💰 돈 및 데이터 처리 함수
    // ----------------------------------------------------

    // 💰 돈 표시 업데이트
    function updateMoneyDisplay() {
        document.getElementById('moneyDisplay').textContent = `${userMoney.toLocaleString()} G`;
    }

    // 💰 돈 추가 및 저장
    function addMoney(amount) {
        userMoney += amount;
        localStorage.setItem('focusFlightMoney', userMoney);
        updateMoneyDisplay();
    }
    
    // 💰 비행 완료 후 돈 보상
    function rewardFlightCompletion(flightData) {
        const focusBonus = flightData.focusSuccess ? 1.5 : 1.0; // 집중 성공 시 1.5배
        const moneyEarned = Math.round(flightData.distance / 10 + (flightData.duration / 60) * 5) * focusBonus;
        addMoney(moneyEarned);
        
        return {
            earned: moneyEarned,
            focusBonus: focusBonus
        };
    }
    
    // 📜 비행 기록 저장
    function saveFlightRecord(data) {
        const records = JSON.parse(localStorage.getItem('focusFlightRecords')) || [];
        records.push(data);
        localStorage.setItem('focusFlightRecords', JSON.stringify(records));
    }

    // 📜 기록 불러오기 및 표시
    function loadRecords() {
        const records = JSON.parse(localStorage.getItem('focusFlightRecords')) || [];
        const recordsDiv = document.getElementById('records');
        recordsDiv.innerHTML = '<h2>✈️ 나의 비행 기록</h2>';

        if (records.length === 0) {
            recordsDiv.innerHTML += '<p style="text-align:center; color:var(--color-text-dim);">아직 비행 기록이 없습니다. 첫 비행을 시작해 보세요!</p>';
            return;
        }

        // 최신 기록이 위로 오도록 역순 정렬
        records.reverse().forEach(record => {
            recordsDiv.innerHTML += generateTicketHTML(record);
        });
    }

    // 📜 티켓 HTML 생성
    function generateTicketHTML(record) {
        const dep = airportData[record.departure];
        const arr = airportData[record.arrival];
        const focusModeText = record.focusMode === 'hard' ? '고강도 집중' : (record.focusMode === 'medium' ? '중간 집중' : '일반 모드');
        const statusText = record.focusSuccess ? '✅ 집중 성공' : '❌ 집중 실패';
        const focusClass = record.focusSuccess ? 'color: var(--color-primary);' : 'color: var(--color-accent-red);';
        
        return `
            <div class="ticket-item">
                <div class="ticket-main">
                    <div class="bp-info">
                        <div class="ticket-header">${record.departure} ➔ ${record.arrival}</div>
                        <div class="ticket-time-code">${new Date(record.startTime).toLocaleString('ko-KR')}</div>
                    </div>
                    <div class="bp-seat-mode">
                        <div class="bp-seat">${record.seat}</div>
                        <div class="bp-mode">${record.class}</div>
                    </div>
                </div>
                <div class="ticket-info-panel">
                    <div><span class="ticket-info-label">편명:</span> <span class="ticket-info-value">DUKKI ${record.id.slice(0, 4)}</span></div>
                    <div><span class="ticket-info-label">좌석 등급:</span> <span class="ticket-info-value">${record.class}</span></div>
                    <div><span class="ticket-info-label">거리:</span> <span class="ticket-info-value">${record.distance.toLocaleString()} km</span></div>
                    <div><span class="ticket-info-label">소요 시간:</span> <span class="ticket-info-value">${formatTime(record.duration)}</span></div>
                    <div><span class="ticket-info-label">집중 모드:</span> <span class="ticket-info-value">${focusModeText}</span></div>
                    <div><span class="ticket-info-label">집중 상태:</span> <span class="ticket-info-value" style="${focusClass}">${statusText}</span></div>
                    <div><span class="ticket-info-label">획득 금액:</span> <span class="ticket-info-value">${record.moneyEarned.toLocaleString()} G</span></div>
                    <div><span class="ticket-info-label">도착 시간:</span> <span class="ticket-info-value">${new Date(record.endTime).toLocaleTimeString('ko-KR', { timeZone: arr.tzOffset ? `Etc/GMT${-arr.tzOffset}` : undefined })} (${arr.code} 현지)</span></div>
                </div>
            </div>
        `;
    }
    
    // 📈 추세 불러오기 및 표시
    function loadTrends() {
        const records = JSON.parse(localStorage.getItem('focusFlightRecords')) || [];
        const trendsDiv = document.getElementById('trendsContainer');
        const trendData = calculateTrends(records);

        trendsDiv.innerHTML = `
            <button class="close-container-btn" id="closeTrendsBtn">×</button> 
            <h2 style="text-align:center; color:var(--color-primary); margin-bottom: 20px;">📈 비행 추세 분석</h2>

            <div class="trends-grid">
                <div class="trend-item">
                    <div class="trend-label">총 비행 횟수</div>
                    <div class="trend-value">${trendData.totalFlights} 회</div>
                </div>
                <div class="trend-item">
                    <div class="trend-label">총 비행 거리</div>
                    <div class="trend-value">${trendData.totalDistance.toLocaleString()} km</div>
                </div>
                <div class="trend-item">
                    <div class="trend-label">총 집중 시간</div>
                    <div class="trend-value">${formatTime(trendData.totalDuration)}</div>
                </div>
                <div class="trend-item">
                    <div class="trend-label">총 획득 금액</div>
                    <div class="trend-value">${trendData.totalMoneyEarned.toLocaleString()} G</div>
                </div>
                <div class="trend-item" style="grid-column: 1 / span 2;">
                    <div class="trend-label">집중 성공률</div>
                    <div class="trend-value" style="font-size: 36px;">${trendData.successRate.toFixed(1)} %</div>
                    <div style="font-size: 12px; color: var(--color-text-dim); margin-top: 5px;">(${trendData.successfulFlights} 성공 / ${trendData.totalFlights} 전체)</div>
                </div>
            </div>
            <div style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">By TEAMBUCK</div> 
        `;

        // 닫기 버튼 재부착
        document.getElementById('closeTrendsBtn').addEventListener('click', () => { 
            document.getElementById('trendsContainer').style.display = 'none'; 
        });
    }

    // 📈 추세 데이터 계산
    function calculateTrends(records) {
        if (records.length === 0) {
            return {
                totalFlights: 0,
                totalDistance: 0,
                totalDuration: 0,
                totalMoneyEarned: 0,
                successfulFlights: 0,
                successRate: 0
            };
        }

        const totalFlights = records.length;
        const totalDistance = records.reduce((sum, record) => sum + record.distance, 0);
        const totalDuration = records.reduce((sum, record) => sum + record.duration, 0);
        const totalMoneyEarned = records.reduce((sum, record) => sum + record.moneyEarned, 0);
        const successfulFlights = records.filter(record => record.focusSuccess).length;
        const successRate = (successfulFlights / totalFlights) * 100;

        return {
            totalFlights,
            totalDistance: Math.round(totalDistance),
            totalDuration,
            totalMoneyEarned: Math.round(totalMoneyEarned),
            successfulFlights,
            successRate
        };
    }

    // 📜 기록 지우기
    document.getElementById('clearRecordsBtn').addEventListener('click', function() {
        if (confirm('경고: 모든 비행 기록을 영구적으로 삭제하시겠습니까?')) {
            localStorage.removeItem('focusFlightRecords');
            loadRecords(); // 기록 목록 새로고침
            alert('모든 비행 기록이 삭제되었습니다.');
        }
    });

    // ----------------------------------------------------
    // 🧮 유틸리티 함수
    // ----------------------------------------------------

    // 🧮 두 지점 간의 거리 계산 (하버사인 공식)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 지구 반지름 (km)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // 거리 (km)
        return Math.round(distance);
    }

    // 🧮 초를 H:MM:SS 형식으로 포맷
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num) => num.toString().padStart(2, '0');

        if (hours > 0) {
            return `${hours}h ${pad(minutes)}m`;
        } else {
            return `${pad(minutes)}m ${pad(seconds)}s`;
        }
    }

    // 🧮 주어진 시간대 오프셋(UTC 기준)에 맞는 현지 시각 반환
    function getLocalTime(tzOffset) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // UTC
        const localTime = new Date(utc + (3600000 * tzOffset));
        return localTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    }

    // ----------------------------------------------------
    // ⏱️ 타이머 및 시계 UI
    // ----------------------------------------------------

    // ⏱️ 시계 UI 업데이트
    function updateClocks() {
        const depCode = currentFlight ? currentFlight.departure.code : airportData['Seoul'].code;
        const arrCode = currentFlight ? currentFlight.arrival.code : airportData['New York'].code;
        const depTz = currentFlight ? currentFlight.departure.tzOffset : airportData['Seoul'].tzOffset;
        const arrTz = currentFlight ? currentFlight.arrival.tzOffset : airportData['New York'].tzOffset;

        document.getElementById('depClockCode').textContent = depCode;
        document.getElementById('depClockTime').textContent = getLocalTime(depTz);
        document.getElementById('arrClockCode').textContent = arrCode;
        document.getElementById('arrClockTime').textContent = getLocalTime(arrTz);
    }
    
    // ⏱️ 비행 중 타이머 및 거리 UI 업데이트
    function updateTimerAndDistance() {
        if (!currentFlight || !isFlightActive) return;

        // 비행 시간 업데이트
        const timeElapsed = Math.floor((Date.now() - currentFlight.startTimeMs) / 1000);
        const timeRemaining = Math.max(0, currentFlight.totalDuration - timeElapsed);
        currentFlight.timeElapsed = timeElapsed;

        document.getElementById('timeElapsedValue').textContent = formatTime(timeElapsed);
        document.getElementById('timeRemainingValue').textContent = formatTime(timeRemaining);

        // 진행률 계산
        const progressRatio = timeElapsed / currentFlight.totalDuration;
        const progressKm = currentFlight.distance * progressRatio;
        const distanceRemaining = currentFlight.distance - progressKm;

        document.getElementById('distanceValue').textContent = `${progressKm.toLocaleString()} km`;
        document.getElementById('distanceRemainingValue').textContent = `${distanceRemaining.toLocaleString()} km`;

        // 비행기 마커 위치 업데이트
        const lat = currentFlight.startLat + (currentFlight.endLat - currentFlight.startLat) * progressRatio;
        const lon = currentFlight.startLon + (currentFlight.endLon - currentFlight.startLon) * progressRatio;
        
        if (planeMarker) {
            planeMarker.setLatLng([lat, lon]);
            
            // 지도 따라가기 모드
            if (isFollowing) {
                map.panTo(planeMarker.getLatLng(), { animate: true, duration: 0 });
            }
        }

        // 비행 완료 검사
        if (timeRemaining <= 0) {
            endFlight(true); // 비행 완료
        }
    }

    // ----------------------------------------------------
    // ✈️ 비행 시뮬레이션 함수
    // ----------------------------------------------------

    // ✈️ 비행 시작 버튼 클릭 (티켓팅 모달 열기)
    document.getElementById('ticketBtn').addEventListener('click', () => {
        // 비행 중에는 버튼이 비활성화되지만, 한 번 더 확인
        if (isFlightActive) {
            alert('이미 비행 중입니다! 🛫');
            return;
        }
        
        // 티켓팅 모달 열기
        openModal('ticketModal');

        // 티켓 모달에서 좌석 등급 정보 업데이트
        updateSeatClassInfo();
    });

    // ✈️ 티켓팅 모달의 좌석 선택 컨테이너 접기/펴기
    document.getElementById('confirmSelectionBtn').addEventListener('click', () => {
        const seatSelectionContainer = document.getElementById('seatSelectionContainer');
        const confirmBtn = document.getElementById('confirmSelectionBtn');
        const selectedSeat = document.querySelector('.seat.selected');
        
        if (!selectedSeat) {
            alert('좌석을 선택해 주세요.');
            return;
        }

        if (seatSelectionContainer.classList.contains('collapsed')) {
            // 펴기
            seatSelectionContainer.classList.remove('collapsed');
            confirmBtn.textContent = '좌석 선택 완료 및 출발 준비';
            confirmBtn.style.background = '#dc3545'; // 빨간색으로 변경
        } else {
            // 접기
            seatSelectionContainer.classList.add('collapsed');
            confirmBtn.textContent = '좌석/모드 확인';
            confirmBtn.style.background = 'var(--color-primary)';
            
            // 최종 티켓 인쇄 (프린트 모션)
            printBoardingPass(selectedSeat);
        }
    });

    // ✈️ 좌석 등급 정보 업데이트
    function updateSeatClassInfo() {
        const selectedSeat = document.querySelector('.seat.selected');
        const infoDiv = document.getElementById('selectedSeatClassInfo');
        
        if (!infoDiv) return;

        let selectedClass = 'E'; // 기본은 이코노미
        if (selectedSeat) {
            selectedClass = selectedSeat.dataset.class;
        }

        let timeMultiplier = 1;
        let moneyMultiplier = 1;
        let classText = '이코노미 (E)';
        
        if (selectedClass === 'B') {
            timeMultiplier = 1.2;
            moneyMultiplier = 1.5;
            classText = '비즈니스 (B)';
        } else if (selectedClass === 'F') {
            timeMultiplier = 1.5;
            moneyMultiplier = 2.0;
            classText = '퍼스트 (F)';
        }
        
        // 거리 및 기본 시간 가져오기
        const selectedItem = document.querySelector('.arrival-item.selected-arrival');
        if (!selectedItem) return;
        const departureName = document.getElementById('departureSelect').value;
        const arrivalName = selectedItem.dataset.name;
        const dep = airportData[departureName];
        const arr = airportData[arrivalName];
        const distanceKm = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);
        const baseFlightTimeMin = Math.round(distanceKm / 800) * 60;

        const totalDurationMin = Math.round(baseFlightTimeMin * timeMultiplier);
        
        infoDiv.innerHTML = `
            <div style="margin-top: 10px;">
                <span class="flight-subtitle">좌석 등급:</span> ${classText} (${timeMultiplier}x 시간, ${moneyMultiplier}x 금액)
            </div>
            <div>
                <span class="flight-subtitle">최종 예상 소요 시간:</span> ${formatTime(totalDurationMin)}
            </div>
        `;
    }

    // ✈️ 탑승권 인쇄
    function printBoardingPass(selectedSeat) {
        const departureName = document.getElementById('departureSelect').value;
        const arrivalName = document.querySelector('.arrival-item.selected-arrival').dataset.name;
        const focusMode = document.querySelector('.focus-button.selected').dataset.mode;
        
        const dep = airportData[departureName];
        const arr = airportData[arrivalName];
        const distanceKm = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);

        const selectedClass = selectedSeat.dataset.class;
        let timeMultiplier = 1;
        if (selectedClass === 'B') timeMultiplier = 1.2;
        if (selectedClass === 'F') timeMultiplier = 1.5;
        const baseFlightTimeMin = Math.round(distanceKm / 800) * 60;
        const totalDurationSec = Math.round(baseFlightTimeMin * timeMultiplier);

        document.getElementById('bpRoute').textContent = `${dep.code} ➔ ${arr.code}`;
        document.getElementById('bpSeat').textContent = selectedSeat.textContent;
        document.getElementById('bpMode').textContent = `${selectedClass} / ${focusMode === 'hard' ? '고강도 집중' : (focusMode === 'medium' ? '중간 집중' : '일반 모드')}`;
        document.getElementById('bpDetails').innerHTML = `
            편명: DUKKI ${Math.random().toString(36).substring(2, 6).toUpperCase()} | 
            탑승 시간: ${new Date().toLocaleTimeString('ko-KR')} | 
            소요 시간: ${formatTime(totalDurationSec)}
        `;

        // 티켓 컨테이너 보이기
        const passContainer = document.getElementById('boardingPassContainer');
        passContainer.classList.add('show');
        
        // 슬라이드바 보이기
        document.getElementById('slideTrack').style.display = 'block';

        // 슬라이더 초기화
        resetSlider();
    }
    
    // ✈️ 슬라이더 로직
    const slideTrack = document.getElementById('slideTrack');
    const slideHandle = document.getElementById('slideHandle');
    const slideBackground = document.getElementById('slideBackground');
    const slideText = document.getElementById('slideText');
    let isSliding = false;
    let initialX;

    function resetSlider() {
        slideBackground.style.width = '0%';
        slideHandle.style.left = '2px';
        slideText.textContent = '슬라이드하여 비행 시작 🚀';
    }

    slideTrack.addEventListener('mousedown', startSlide);
    slideTrack.addEventListener('touchstart', startSlide, { passive: false });

    function startSlide(e) {
        if (isFlightActive) return;

        isSliding = true;
        slideTrack.classList.add('sliding');
        
        const clientX = e.clientX || e.touches[0].clientX;
        const handleRect = slideHandle.getBoundingClientRect();
        initialX = clientX - handleRect.left;
        
        document.addEventListener('mousemove', onSlide);
        document.addEventListener('mouseup', endSlide);
        document.addEventListener('touchmove', onSlide, { passive: false });
        document.addEventListener('touchend', endSlide);

        e.preventDefault();
    }

    function onSlide(e) {
        if (!isSliding) return;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const trackRect = slideTrack.getBoundingClientRect();
        
        let newX = clientX - trackRect.left - initialX;
        
        // 범위 제한
        const maxSlide = trackRect.width - slideHandle.offsetWidth - 4; // 2px 패딩 제외
        newX = Math.max(2, Math.min(newX, maxSlide));
        
        const progress = (newX - 2) / maxSlide;
        
        slideHandle.style.left = `${newX}px`;
        slideBackground.style.width = `${(newX + slideHandle.offsetWidth / 2)}px`;

        if (progress > 0.95) {
            slideText.textContent = '이륙 준비...';
        } else {
            slideText.textContent = '슬라이드하여 비행 시작 🚀';
        }

        e.preventDefault();
    }

    function endSlide(e) {
        if (!isSliding) return;
        isSliding = false;
        slideTrack.classList.remove('sliding');

        document.removeEventListener('mousemove', onSlide);
        document.removeEventListener('mouseup', endSlide);
        document.removeEventListener('touchmove', onSlide);
        document.removeEventListener('touchend', endSlide);

        const trackRect = slideTrack.getBoundingClientRect();
        const handleRect = slideHandle.getBoundingClientRect();
        const currentProgress = (handleRect.left - trackRect.left - 2) / (trackRect.width - slideHandle.offsetWidth - 4);
        
        if (currentProgress > 0.95) {
            // 비행 시작
            startFlight();
            closeModal('ticketModal');
            document.getElementById('slideTrack').style.display = 'none';
            document.getElementById('boardingPassContainer').classList.remove('show');
        } else {
            // 슬라이더 원위치
            resetSlider();
        }
        e.preventDefault();
    }
    
    // ✈️ 실제 비행 시작
    function startFlight() {
        if (isFlightActive) return;
        
        // 1. 데이터 추출
        const departureName = document.getElementById('departureSelect').value;
        const arrivalName = document.querySelector('.arrival-item.selected-arrival').dataset.name;
        const selectedSeat = document.querySelector('.seat.selected');
        const focusMode = document.querySelector('.focus-button.selected').dataset.mode;
        
        const dep = airportData[departureName];
        const arr = airportData[arrivalName];
        const distanceKm = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);

        const selectedClass = selectedSeat.dataset.class;
        let timeMultiplier = 1;
        if (selectedClass === 'B') timeMultiplier = 1.2;
        if (selectedClass === 'F') timeMultiplier = 1.5;
        const baseFlightTimeMin = Math.round(distanceKm / 800) * 60;
        const totalDurationSec = Math.round(baseFlightTimeMin * timeMultiplier);

        // 2. 비행 상태 객체 생성
        currentFlight = {
            id: Date.now().toString(),
            departure: dep,
            arrival: arr,
            distance: distanceKm,
            totalDuration: totalDurationSec, // 초 단위
            timeElapsed: 0,
            startTimeMs: Date.now(),
            startLat: dep.lat,
            startLon: dep.lon,
            endLat: arr.lat,
            endLon: arr.lon,
            focusMode: focusMode,
            seat: selectedSeat.textContent,
            class: selectedClass,
            // 집중 성공 여부는 비행 종료 시 결정 (임시로 true 설정)
            focusSuccess: true 
        };

        // 3. UI/지도 상태 업데이트
        isFlightActive = true;
        document.body.classList.add('controls-disabled'); // 컨트롤 비활성화
        document.getElementById('timerContainer').style.display = 'flex'; // 타이머 표시
        document.getElementById('timerContainer').classList.add('is-flight-active');
        document.getElementById('followToggleBtn').style.display = 'flex'; // Follow 버튼 표시
        document.getElementById('ticketBtn').classList.add('disabled-during-flight');
        document.getElementById('moneyDisplay').classList.add('in-flight');

        // 기존 마커 제거 (출발/도착 마커는 유지, 비행 경로/비행기 마커는 새로 생성)
        if (flightPath) map.removeLayer(flightPath);
        if (planeMarker) map.removeLayer(planeMarker);
        
        // 비행 경로 (임시)
        flightPath = L.polyline([[dep.lat, dep.lon], [arr.lat, arr.lon]], { color: 'var(--color-primary)', weight: 3, opacity: 0.7, dashArray: '10, 10' }).addTo(map);

        // 비행기 마커
        const planeIcon = L.divIcon({ 
            className: 'emoji-marker-icon', 
            html: '✈️', 
            iconSize: [32, 32], 
            iconAnchor: [16, 16] 
        });
        planeMarker = L.marker([dep.lat, dep.lon], { icon: planeIcon }).addTo(map);

        // Follow 모드 설정
        setFollowing(true);

        // 4. 타이머/애니메이션 시작
        function animateFlight() {
            updateTimerAndDistance();
            updateClocks(); // 시계 계속 업데이트
            if (isFlightActive) {
                animationFrameId = requestAnimationFrame(animateFlight);
            }
        }
        animateFlight();

        // 5. 알림
        showFlightPopup(`🛫 이륙합니다! ${dep.code} ➔ ${arr.code}`, 5000);
        
        // 6. 백그라운드 뮤직 재생 (브라우저 정책 때문에 JS에서는 재생이 막힐 수 있음)
        document.getElementById('backgroundMusic').play().catch(e => console.log('Music autoplay failed:', e));
    }

    // ✈️ 비행 종료
    function endFlight(success) {
        if (!isFlightActive) return;
        
        // 1. 애니메이션 중지 및 상태 업데이트
        isFlightActive = false;
        cancelAnimationFrame(animationFrameId);

        // 2. 집중 성공 여부 결정 (TODO: 실제 집중 성공 로직 구현)
        currentFlight.focusSuccess = success; 

        // 3. 보상 및 기록 저장
        const reward = rewardFlightCompletion(currentFlight);
        currentFlight.moneyEarned = reward.earned;
        currentFlight.endTime = Date.now();
        currentFlight.duration = currentFlight.timeElapsed; // 최종 소요 시간 기록
        saveFlightRecord(currentFlight);
        
        // 4. 지도 및 UI 정리
        document.body.classList.remove('controls-disabled');
        document.getElementById('timerContainer').style.display = 'none';
        document.getElementById('timerContainer').classList.remove('is-flight-active');
        document.getElementById('followToggleBtn').style.display = 'none';
        document.getElementById('ticketBtn').classList.remove('disabled-during-flight');
        document.getElementById('moneyDisplay').classList.remove('in-flight');

        if (planeMarker) map.removeLayer(planeMarker);
        if (flightPath) map.removeLayer(flightPath);
        
        // 5. 알림 및 애니메이션
        if (success) {
            showFlightPopup(`🛬 ${currentFlight.arrival.code} 도착! ${reward.earned.toLocaleString()} G 획득!`, 5000);
            playStampAnimation();
        } else {
            showFlightPopup(`❌ 비행 실패 (집중 실패)!`, 5000);
        }

        // 6. 음악 중지
        document.getElementById('backgroundMusic').pause();
        
        currentFlight = null; // 비행 상태 초기화
    }
    
    // ✈️ 비행 알림 팝업 표시
    function showFlightPopup(message, duration) {
        const popup = document.getElementById('flightPopup');
        popup.textContent = message;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, duration);
    }
    
    // ✈️ 도장 애니메이션
    function playStampAnimation() {
        const stamp = document.getElementById('stampAnimation');
        stamp.classList.remove('stamp-animate');
        // 강제로 리플로우를 발생시켜 애니메이션 재시작을 보장
        void stamp.offsetWidth; 
        stamp.classList.add('stamp-animate');
    }

    // ----------------------------------------------------
    // 💾 데이터 내보내기/불러오기 함수
    // ----------------------------------------------------
    
    /**
     * 📤 LocalStorage 데이터 내보내기 (JSON 파일)
     */
    window.exportData = function() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('focusFlight')) { 
                data[key] = localStorage.getItem(key);
            }
        }

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dukki_focusflight_data_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('데이터가 성공적으로 내보내졌습니다! 💾');
    }

    /**
     * 📥 LocalStorage 데이터 불러오기 (파일 선택 및 덮어쓰기)
     */
    window.importData = function() {
        if (!confirm('경고: 데이터를 불러오면 현재 저장된 이름, 돈, 여행 기록이 파일 내용으로 덮어쓰여집니다. 계속하시겠습니까?')) {
            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    for (const key in data) {
                        if (key.startsWith('focusFlight')) { 
                             localStorage.setItem(key, data[key]);
                        }
                    }
                    
                    alert('데이터 불러오기 완료! 변경 사항을 적용하기 위해 페이지를 새로고침합니다. 🔄');
                    window.location.reload(); 
                    
                } catch (error) {
                    alert('파일을 읽는 도중 오류가 발생했습니다: ' + error.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
    
    // ----------------------------------------------------
    // 🚀 앱 초기 실행
    // ----------------------------------------------------
    
    loadUserName();
    updateClocks(); 
    initializeMap();
    
    // 1초마다 시계 업데이트
    setInterval(updateClocks, 1000); 

    // ----------------------------------------------------
    // ✈️ 좌석 선택 로직
    // ----------------------------------------------------
    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function() {
            if (this.classList.contains('unavailable')) return;
            
            // 기존 선택 해제
            document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
            
            // 새 좌석 선택
            this.classList.add('selected');
            
            // 좌석 등급 정보 업데이트
            updateSeatClassInfo();
        });
    });

    // ✈️ 초기 좌석 선택 (첫 번째 좌석)
    const initialSeat = document.querySelector('.seat:not(.unavailable)');
    if (initialSeat) {
        initialSeat.classList.add('selected');
    }
});