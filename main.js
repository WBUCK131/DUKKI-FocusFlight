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
      'Sydney':{code:'SYD',name:'Sydney Kingsford Smith Airport',lat:-33.9399,lon:151.1753, tzOffset: 11},
      'Paris':{code:'CDG',name:'Charles de Gaulle Airport',lat:49.0097,lon:2.5479, tzOffset: 1},
      'Los Angeles':{code:'LAX',name:'Los Angeles International Airport',lat:33.9416,lon:-118.4085, tzOffset: -8},
      'Dubai':{code:'DXB',name:'Dubai International Airport',lat:25.2532,lon:55.3653, tzOffset: 4},
      'Beijing':{code:'PEK',name:'Beijing Capital International Airport',lat:40.0801,lon:116.6031, tzOffset: 8},
      'Singapore':{code:'SIN',name:'Singapore Changi Airport',lat:1.3592,lon:103.9893, tzOffset: 8},
      'Frankfurt':{code:'FRA',name:'Frankfurt Airport',lat:50.0379,lon:8.5622, tzOffset: 1},
      'Amsterdam':{code:'AMS',name:'Amsterdam Airport Schhol',lat:52.3105,lon:4.7683, tzOffset: 1},
      'Hong Kong':{code:'HKG',name:'Hong Kong International Airport',lat:22.3080,lon:113.9184, tzOffset: 8},
      'Chicago':{code:'ORD',name:'O\'Hare International Airport',lat:41.9742,lon:-87.9073, tzOffset: -6},
      'Toronto':{code:'YYZ',name:'Toronto Pearson International Airport',lat:43.6777,lon:-79.6248, tzOffset: -5},
      'Istanbul':{code:'IST',name:'Istanbul Airport',lat:41.2036,lon:28.9855, tzOffset: 3},
      'Bangkok':{code:'BKK',name:'Suvarnabhumi Airport',lat:13.6811,lon:100.7473, tzOffset: 7},
      'Mumbai':{code:'BOM',name:'Chhatrapati Shivaji Maharaj Intl Airport',lat:19.0886,lon:72.8679, tzOffset: 5.5},
      'Madrid':{code:'MAD',name:'Adolfo Suárez Madrid–Barajas Airport',lat:40.4839,lon:-3.5679, tzOffset: 1},
      'Moscow':{code:'SVO',name:'Sheremetyevo International Airport',lat:55.9726,lon:37.4146, tzOffset: 3},
      'Dallas':{code:'DFW',name:'Dallas/Fort Worth International Airport',lat:32.8998,lon:-97.0403, tzOffset: -6},
      'Rome':{code:'FCO',name:'Leonardo da Vinci–Fiumicino Airport',lat:41.8003,lon:12.2464, tzOffset: 1},
      'Mexico City':{code:'MEX',name:'Mexico City International Airport',lat:19.4363,lon:-99.0720, tzOffset: -6},
      'Cairo':{code:'CAI',name:'Cairo International Airport',lat:30.1219,lon:31.3920, tzOffset: 2},
      'Rio de Janeiro':{code:'GIG',name:'Rio de Janeiro Intl Airport',lat:-22.8122,lon:-43.2492, tzOffset: -3},
      'Cape Town':{code:'CPT',name:'Cape Town International Airport',lat:-33.9685,lon:-123.1842, tzOffset: 2},
      'Vancouver':{code:'YVR',name:'Vancouver International Airport',lat:49.1939,lon:18.5975, tzOffset: -8},
      'Taipei':{code:'TPE',name:'Taiwan Taoyuan International Airport',lat:25.0777,lon:121.2325, tzOffset: 8},
      'Auckland':{code:'AKL',name:'Auckland Airport',lat:-37.0082,lon:174.7917, tzOffset: 13},
      'Doha':{code:'DOH',name:'Hamad International Airport',lat:25.2731,lon:51.6053, tzOffset: 3},
      'Boston':{code:'BOS',name:'Logan International Airport',lat:42.3656,lon:-71.0096, tzOffset: -5}
    };

    // ✈️ 비행 시간 (기존 유지)
    const flightTimes = {};
    const cities = Object.keys(airportData);
    
    // 헬퍼 함수 (기존 유지)
    const R = 6371; 
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; 
    }
    
    cities.forEach((city1) => {
        const dep = airportData[city1];
        cities.forEach((city2) => {
            if (city1 === city2) return; 

            const arr = airportData[city2];
            const key = `${city1}-${city2}`;

            const distance = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);
            let durationHours = distance / 800; 
            durationHours = Math.max(0.5, durationHours); 
            durationHours = Math.min(24, durationHours); 
            durationHours += (Math.random() - 0.5) * 1; 
            const durationSec = Math.round(durationHours * 3600);
            flightTimes[key] = durationSec;
        });
    });
    
    // (수동 시간 조정)
    flightTimes['Gimpo-Seoul'] = 0.5*3600;
    flightTimes['Seoul-Gimpo'] = 0.5*3600;
    flightTimes['Gimpo-Jeju'] = 1*3600 + 10*60;
    flightTimes['Seoul-Jeju'] = 1*3600 + 10*60;
    flightTimes['Seoul-Busan'] = 1*3600;
    flightTimes['Seoul-Tokyo'] = 2.5*3600;
    flightTimes['Seoul-New York'] = 15*3600+40*60;
    flightTimes['Seoul-London'] = 11*3600+30*60;
    flightTimes['Seoul-Sydney'] = 10*3600;
    flightTimes['New York-London'] = 7*3600+30*60;

    // ----------------------------------------------------
    // ⚙️ 전역 변수 및 상태 관리
    // ----------------------------------------------------
    let currentDeparture=null;
    let selectedArrival=null;
    let selectedSeat=null; 
    let selectedFocusMode=null; 
    let pendingFlight=null;
    let timerInterval=null;
    let timerSeconds=0;
    let flightMarker=null, flightLine=null;
    let autoFollow=true; 
    let initialFlightDistance = 0; 
    
    let userName = null; 
    let currentRecordFilter = 'all'; 

    let pressTimer = null;
    const PRESS_DURATION = 5000; 
    
    let departureAirportMarker = null; 
    let arrivalAirportMarker = null; 

    // 🆕 좌석 예약 가능 여부 상태를 저장할 맵
    let seatAvailabilityMap = {};
    
    // 🆕 돈 관련 변수 및 상수
    let currentMoney = parseInt(localStorage.getItem('focusFlightMoney')) || 1;
    const MONEY_GAIN_PER_KM = 5 / 20; 
    let lastMoneyGainDistance = 0; 

    // ----------------------------------------------------
    // 📌 DOM 요소 참조
    // ----------------------------------------------------
    const timerContainer = document.getElementById('timerContainer');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerDisplayPreFlight = document.getElementById('timerDisplayPreFlight');
    const focusStatus = document.getElementById('focusStatus');
    const distanceDisplay = document.getElementById('distanceDisplay'); 
    const departureSearch = document.getElementById('departureSearch');
    const arrivalSearch = document.getElementById('arrivalSearch');
    const departureSelect = document.getElementById('departureSelect');
    const controlsContainer = document.querySelector('.controls-container');
    const selectedFlightInfo = document.getElementById('selectedFlightInfo'); 
    const arrivalList = document.getElementById('arrivalList');
    const ticketBtn = document.getElementById('ticketBtn');
    const modal = document.getElementById('ticketModal');
    const selectedSeatDisplay = document.getElementById('selectedSeatDisplay');
    const selectedFocusModeDisplay = document.getElementById('selectedFocusModeDisplay'); 
    const focusModeButtonsContainer = document.getElementById('focusModeButtons');
    const recordsContainer = document.getElementById('recordsContainer');
    const trendsContainer = document.getElementById('trendsContainer'); 
    const clearRecordsBtn = document.getElementById('clearRecordsBtn'); 
    const bottomNavButtons = document.querySelectorAll('#bottomNav button');
    const flightPopup = document.getElementById('flightPopup');
    const recordFilterButtons = document.querySelectorAll('.record-filter-btn');
    const settingsBtn = document.getElementById('settingsBtn'); 
    const settingsModal = document.getElementById('settingsModal'); 
    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn'); 
    const editNameBtn = document.getElementById('editNameBtn'); 
    const boardingPassContainer = document.getElementById('boardingPassContainer');
    const confirmSelectionBtn = document.getElementById('confirmSelectionBtn');
    const seatMap = document.getElementById('seatMap');
    const bpRoute = document.getElementById('bpRoute');
    const bpFlightNo = document.getElementById('bpFlightNo');
    const bpSeat = document.getElementById('bpSeat');
    const bpFocusMode = document.getElementById('bpFocusMode');
    const bpBarcodeText = document.getElementById('bpBarcodeText');
    const bpGate = document.getElementById('bpGate');
    const bpClass = document.getElementById('bpClass');
    const slideTrack = document.getElementById('slideTrack');
    const slideHandle = document.getElementById('slideHandle');
    const slideBackground = document.getElementById('slideBackground');
    const slideText = document.getElementById('slideText');
    const nameModal = document.getElementById('nameModal');
    const userNameInput = document.getElementById('userNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');
    const greetingContainer = document.getElementById('greetingContainer');
    const seatSelectionContainer = document.getElementById('seatSelectionContainer'); 
    const reselectSeatBtn = document.getElementById('reselectSeatBtn'); 
    const selectionButtons = document.getElementById('selectionButtons'); 

    // 🆕 [수정] 상점 관련 DOM 요소
    const shopBtn = document.getElementById('shopBtn');
    const shopContainer = document.getElementById('shopContainer');
    const closeShopBtn = document.getElementById('closeShopBtn');
    
    const stampAnimation = document.getElementById('stampAnimation');
    
    const toggleFollowBtn = document.getElementById('toggleFollowBtn');
    const followIcon = document.getElementById('followIcon');
    
    const backgroundMusic = document.getElementById('backgroundMusic'); 

    // Try to autoplay background music; browsers often block autoplay with sound.
    // We set preload and volume, attempt to play programmatically, and if the
    // play() promise is rejected we show a small user-visible play button so
    // the user can start audio with a gesture (required by many browsers).
    try {
        backgroundMusic.preload = 'auto';
        backgroundMusic.volume = 0.6;
    } catch (e) {
        // ignore if element not present
    }

    // Note: do NOT attempt to autoplay on load. Background music will be
    // started explicitly when a flight begins (startFlight) and paused in
    // stopFlight. This avoids autoplay UI and respects user's choice.
    
    // 🆕 클락 관련 DOM 요소
    const clockContainer = document.getElementById('clockContainer');
    const currentTimeDisplay = document.getElementById('currentTimeDisplay');
    const localTimeDisplay = document.getElementById('localTimeDisplay');
    
    // 🆕 돈 관련 DOM 요소
    const moneyButton = document.getElementById('moneyButton');
    const moneyDisplay = document.getElementById('moneyDisplay');
    
    let currentBaseLayer = null;
    
    const airplaneIcon = L.divIcon({
        html: '✈️',
        className: 'emoji-marker-icon', 
        iconSize: [32, 32], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -16]
    });
    
    /**
     * 🌟 공항 마커 아이콘 정의 헬퍼 (기존 유지)
     */
    function createAirportIcon(code, isDeparture = true) {
        return L.divIcon({
            html: `${isDeparture ? '🛫' : '🛬'} <span>${code}</span>`,
            className: `airport-marker-icon ${isDeparture ? 'departure' : 'arrival'}`,
            iconSize: [50, 20], 
            iconAnchor: [0, 10] 
        });
    }

    // ⭐ Leaflet 지도 객체 초기화 (기존 유지)
    const map=L.map('map',{zoomControl:true}).setView([20,0],2);
    
    // ----------------------------------------------------
    // 🔄 UI 상태 초기화 함수 (타이머)
    // ----------------------------------------------------
    function initializeTimerUI() {  
    timerContainer.classList.remove('is-flight-active');  
    document.querySelector('.timer-box-time').style.display = 'none';  
    document.querySelector('.timer-box-clock').style.display = 'none';  
    document.querySelector('.timer-box-distance').style.display = 'none';  
    focusStatus.style.display = 'none';  
      
    timerDisplayPreFlight.style.display = 'block';   
    timerDisplayPreFlight.textContent = 'DUKKI Focus';  
      
    timerDisplay.textContent = '00H00M00S';  
    currentTimeDisplay.textContent = '--:--';  
    localTimeDisplay.textContent = '--:--';  
    distanceDisplay.textContent = '0 KM';  
    focusStatus.textContent = '';   
}  

    
    // 💵 돈 UI 초기화
    function initializeMoneyUI() {
        currentMoney = parseInt(localStorage.getItem('focusFlightMoney')) || 1; // 로컬 스토리지에서 다시 로드
        moneyDisplay.textContent = currentMoney;
        moneyButton.classList.remove('in-flight'); // 초기 위치 설정
    }

    initializeTimerUI(); 
    initializeMoneyUI(); 

    // ----------------------------------------------------
    // 🛰️ 지도 레이어 정의 및 초기화 함수 (기존 유지)
    // ----------------------------------------------------

    const baseLayers = {
        "2D 일반 지도": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution:'© OpenStreetMap'
        }),
        "위성 지도": L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
            attribution:'&copy; Google Satellite'
        })
    };

    function initializeMapLayers() {
        const savedStyle = localStorage.getItem('focusFlightMapStyle') || 'satellite';
        currentBaseLayer = baseLayers[savedStyle === '2d' ? "2D 일반 지도" : "위성 지도"];
        currentBaseLayer.addTo(map);
        document.body.classList.remove('map-style-satellite', 'map-style-2d'); 
        document.body.classList.add(`map-style-${savedStyle}`); 
        map.setZoom(2); 

        // 버튼 초기 활성화 상태 설정
        document.querySelectorAll('.map-style-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.style === savedStyle) {
                btn.classList.add('active');
            }
        });
    }
    
    function switchMapStyle(style) {
        if (currentBaseLayer && map.hasLayer(currentBaseLayer)) {
            map.removeLayer(currentBaseLayer);
        }
        
        if (style === '2d') {
            currentBaseLayer = baseLayers["2D 일반 지도"];
            currentBaseLayer.addTo(map);
            document.body.classList.remove('map-style-satellite'); 
            document.body.classList.add('map-style-2d'); 
            map.setView([20, 0], 2); 
        } else if (style === 'satellite') {
            currentBaseLayer = baseLayers["위성 지도"];
            currentBaseLayer.addTo(map);
            document.body.classList.remove('map-style-2d'); 
            document.body.classList.add('map-style-satellite'); 
            map.setView([20, 0], 2); 
        }
        
        localStorage.setItem('focusFlightMapStyle', style); // 설정 저장

        document.querySelectorAll('.map-style-button').forEach(btn => {
            if (btn.dataset.style === style) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        if (flightLine) { flightLine.addTo(map); }
        if (flightMarker) { flightMarker.addTo(map); }
        if (departureAirportMarker) { departureAirportMarker.addTo(map); }
        if (arrivalAirportMarker) { arrivalAirportMarker.addTo(map); }
    }

    // 초기화 호출
    initializeMapLayers();
    // ----------------------------------------------------
    
    // 🗺️ 지도 따라가기/자유 이동 토글 기능
    function toggleFollow() {
        autoFollow = !autoFollow;
        if (autoFollow) {
            followIcon.textContent = '📍'; 
            map.setView(flightMarker ? flightMarker.getLatLng() : map.getCenter(), 13, { animate: true, duration: 0.5 });
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
        } else {
            followIcon.textContent = '☝️'; 
            map.setView(map.getCenter(), 8, { animate: true, duration: 0.5 });
        }
    }
    
    // 초기 아이콘 설정 (기본값: 📍)
    followIcon.textContent = '📍';
    toggleFollowBtn.onclick = toggleFollow;
    
    // ----------------------------------------------------
    // 🌟 이름 관련 함수 (기존 유지)
    
    function loadUserName() {
        userName = localStorage.getItem('focusFlightUserName');
        if (!userName) {
            nameModal.querySelector('h3').textContent = '환영합니다! 🚀';
            nameModal.querySelector('p').innerHTML = '집중 비행 시뮬레이터에 오신 것을 환영합니다.<br>당신의 이름을 설정해주세요.';
            showNameModal();
        } else {
            updateGreeting(userName);
        }
    }

    function showNameModal() {
        nameModal.style.display = 'flex';
        userNameInput.value = userName || ''; 
        userNameInput.focus();
    }
    
    function updateGreeting(name) {
        const greeting = getGreeting();
        greetingContainer.textContent = `${greeting}, ${name} ✈️`;
        greetingContainer.style.display = 'block';
    }

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return '굿모닝';
        } else if (hour >= 12 && hour < 17) {
            return '굿애프터눈';
        } else if (hour >= 17 && hour < 22) {
            return '굿이브닝';
        } else {
            return '굿나잇';
        }
    }

    saveNameBtn.onclick = () => {
        const inputName = userNameInput.value.trim();
        if (inputName) {
            localStorage.setItem('focusFlightUserName', inputName);
            userName = inputName;
            updateGreeting(userName);
            nameModal.style.display = 'none';
        } else {
            alert('이름을 입력해주세요.');
        }
    };
    
    editNameBtn.onclick = () => {
        settingsModal.style.display = 'none'; 
        nameModal.querySelector('h3').textContent = '이름 수정 ✍️';
        nameModal.querySelector('p').innerHTML = '새로운 이름을 입력해주세요.';
        showNameModal();
    };

    // ----------------------------------------------------
    // 🌐 시간 및 위치 관련 헬퍼 함수 추가 (업데이트)
    // ----------------------------------------------------

    let clockInterval = null;
    
    /**
     * ⏰ 현재 시간 및 현지 시간 표시 업데이트
     */
function updateClocks() {  
    const now = new Date();  
    const currentHours = now.getHours();  
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');  
      
    currentTimeDisplay.innerHTML = `<strong>${String(currentHours).padStart(2, '0')}:${currentMinutes}</strong>`;  
  
    if (selectedArrival && airportData[selectedArrival]) {  
        const arrOffset = airportData[selectedArrival].tzOffset;  
        const kstOffset = 9;  
        const diff = arrOffset - kstOffset;  
        let localOffsetHours = currentHours + diff;  
          
        if (localOffsetHours >= 24) localOffsetHours -= 24;  
        else if (localOffsetHours < 0) localOffsetHours += 24;  
          
        const localHours = String(localOffsetHours).padStart(2, '0');  
        localTimeDisplay.innerHTML = `<strong>${localHours}:${currentMinutes}</strong>`;  
    } else {  
        localTimeDisplay.innerHTML = '<strong>--:--</strong>';  
    }  
}  

    
    // 1분마다 시계 업데이트
    clockInterval = setInterval(updateClocks, 60000); 
    
    // 💵 돈 업데이트 및 저장 함수
    function updateMoney(amount) {
        currentMoney += amount;
        currentMoney = Math.max(0, currentMoney); // 음수 방지
        moneyDisplay.textContent = currentMoney;
        localStorage.setItem('focusFlightMoney', currentMoney);
    }

    // ----------------------------------------------------
    // 🛠️ 헬퍼 함수 (타이머, 팝업, 경로 계산 등) (업데이트)
    // ----------------------------------------------------
    
    function formatTime(sec){
        const h=Math.floor(sec/3600);
        const m=Math.floor((sec%3600)/60);
        const s=sec%60;
        // 요청된 포맷: 00H 00M 00S
        return `${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;
    }

    let popupTimer = null;
    function showPopup(message, duration) {
        if (popupTimer) {
            clearTimeout(popupTimer); 
        }
        flightPopup.innerHTML = message;
        flightPopup.style.display = 'block'; 
        
        popupTimer = setTimeout(() => {
            flightPopup.style.display = 'none';
        }, duration);
    }

    // 🌟 비행 완료 스탬프 애니메이션 함수 추가 (기존 유지)
    function showStampAnimation() {
        stampAnimation.classList.add('stamp-animate');
        // 4초 후 애니메이션 클래스 제거 및 숨김
        setTimeout(() => {
            stampAnimation.classList.remove('stamp-animate');
        }, 4000); 
    }

    function startTimer(duration, focusMode){ 
        clearInterval(timerInterval);
        timerSeconds=duration;
        timerDisplay.textContent=formatTime(timerSeconds);
        focusStatus.textContent = focusMode; 
        timerInterval=setInterval(()=>{
            if(timerSeconds<=0){ 
                saveFlightRecord(); 
                showStampAnimation(); 
                stopFlight(true); 
                return; 
            } 
            timerSeconds--; 
            timerDisplay.textContent=formatTime(timerSeconds);
        },1000);
    }
    
    function greatCircle(from,to,steps){ 
        const lat1=from[0]*Math.PI/180, lon1=from[1]*Math.PI/180;
        const lat2=to[0]*Math.PI/180, lon2=to[1]*Math.PI/180;
        const d=2*Math.asin(Math.sqrt(Math.sin((lat2-lat1)/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin((lon2-lon1)/2)**2));
        const path=[];
        for(let i=0;i<=steps;i++){
            const f=i/steps;
            const A=Math.sin((1-f)*d)/Math.sin(d);
            const B=Math.sin(f*d)/Math.sin(d);
            const x=A*Math.cos(lat1)*Math.cos(lon1)+B*Math.cos(lat2)*Math.cos(lon2);
            const y=A*Math.cos(lat1)*Math.sin(lon1)+B*Math.cos(lat2)*Math.sin(lon2);
            const z=A*Math.sin(lat1)+B*Math.sin(lat2);
            const lat=Math.atan2(z,Math.sqrt(x*x+y*y));
            const lon=Math.atan2(y,x);
            path.push([lat*180/Math.PI,lon*180/Math.PI]);
        }
        return path;
    }
    
    function moveMarkerWithTimer(from,to,durationSec,callback){ 
        if(flightLine) map.removeLayer(flightLine);
        if(flightMarker) map.removeLayer(flightMarker);
        
        if (departureAirportMarker) { departureAirportMarker.addTo(map); }
        if (arrivalAirportMarker) { arrivalAirportMarker.addTo(map); }
        
        map.setView(from,13); 
        
        const destLat = to[0];
        const destLon = to[1];

        const fps=30;
        const steps=durationSec*fps;
        const path=greatCircle(from,to,steps);
        flightLine=L.polyline(path,{color:'#0077ff'}).addTo(map);
        flightMarker=L.marker(from, {icon: airplaneIcon}).addTo(map); 
        let step=0;
        
        // 🆕 거리-돈 획득 로직 관련 변수
        let lastCalculatedDistance = initialFlightDistance; 
        lastMoneyGainDistance = 0; // 이륙 시점에서는 0km로 초기화

        function animate(){
            if(step>=path.length){ 
                distanceDisplay.textContent = '0 km'; 
                showPopup("비행을 완료했습니다 좋은 여행 되세요🛬", 3000);
                if(callback) callback(); 
                return; 
            }
            
            const currentLat = path[step][0];
            const currentLon = path[step][1];
            
            flightMarker.setLatLng(path[step]);
            const markerEl = flightMarker.getElement();


        function calcBearing(latA, lonA, latB, lonB) {
    const rad = Math.PI / 180;
    const φ1 = latA * rad;
    const φ2 = latB * rad;
    const dLon = (lonB - lonA) * rad;

    const y = Math.sin(dLon) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(dLon);

    let angle = Math.atan2(y, x) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    return angle;
}

const nextPos = path[Math.min(step + 1, path.length - 1)];
const [nLat, nLon] = nextPos;

// 방향(방위각) 계산
const dir = calcBearing(currentLat, currentLon, nLat, nLon);

if (markerEl) {
    // 기존 transform에서 translate3d 부분만 추출
    const translate = markerEl.style.transform.match(/translate3d\([^)]*\)/)?.[0] || '';
    // 비행기 기본 방향 보정 (✈️ 대부분 오른쪽 또는 위쪽 기준)
    const rotation = dir - 45; // 45도 보정은 필요에 따라 조정
    markerEl.style.transform += `rotate(${rotation.toFixed(1)}deg)`;
}

            // 🗺️ autoFollow 상태에 따라 맵 이동 결정
            if(autoFollow) {
                map.panTo(path[step],{animate:false});
                //map.setZoom(13); 
            }

            const remainingDistance = calculateDistance(currentLat, currentLon, destLat, destLon);
            distanceDisplay.textContent = `${remainingDistance.toFixed(0)} km`; 
            
            // 💰 돈 획득 로직
            const distanceTraveledSinceStart = lastCalculatedDistance - remainingDistance;
            const newTotalTraveled = Math.max(0, distanceTraveledSinceStart);
            
            const gainableDistance = newTotalTraveled - lastMoneyGainDistance;
            
            if (gainableDistance >= 20) {
                const moneyGained = Math.floor(gainableDistance / 20) * 5;
                updateMoney(moneyGained);
                lastMoneyGainDistance += Math.floor(gainableDistance / 20) * 20; 
            }

            step++; 
            setTimeout(animate,1000/fps);
        }
        animate();
    }
    
    function generateFlightNumber(){ 
        const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums='0123456789';
        return letters.charAt(Math.floor(Math.random()*26))+letters.charAt(Math.floor(Math.random()*26))
            +nums.charAt(Math.floor(Math.random()*10))+nums.charAt(Math.floor(Math.random()*10))
            +nums.charAt(Math.floor(Math.random()*10));
    }
    
    /**
     * 🌟 좌석 예약 가능 여부 함수 (확률 업데이트)
     */
    function isSeatAvailable(seatClass) {
        const rand = Math.random();
        if (seatClass === 'F') return rand < 0.04; // 4% 예약 가능
        if (seatClass === 'B') return rand < 0.10; // 10% 예약 가능
        return rand < 0.89; // 89% 예약 가능 (나머지 1%는 에러/미확인 좌석으로 가정)
    }

    
    // ----------------------------------------------------
    // 🌐 UI 및 이벤트 핸들러 (선택, 모달, 렌더링)
    // ----------------------------------------------------
    
    function renderDepartureSelect(filter = '') {
        const filterText = filter.toLowerCase();
        const currentSelected = departureSelect.value; 
        departureSelect.innerHTML = ''; 
        
        const placeholder = document.createElement('option');
        placeholder.value = "";
        placeholder.textContent = "출발 도시 선택";
        placeholder.disabled = true;
        departureSelect.appendChild(placeholder);
        
        Object.keys(airportData).forEach(city => {
            const airport = airportData[city];
            const searchText = `${city} ${airport.code} ${airport.name}`.toLowerCase();
            
            if (filterText === '' || searchText.includes(filterText)) {
                const opt = document.createElement('option');
                opt.value = city;
                opt.textContent = `${airport.code} - ${city}`; 
                departureSelect.appendChild(opt);
            }
        });
        
        if (currentSelected && departureSelect.querySelector(`option[value="${currentSelected}"]`)) {
            departureSelect.value = currentSelected;
        } else {
            departureSelect.value = "";
        }
    }

    renderDepartureSelect();

    departureSearch.oninput = () => {
        renderDepartureSelect(departureSearch.value);
    };

    departureSelect.onchange=()=>{ 
      currentDeparture=departureSelect.value;
      selectedFlightInfo.style.display='none'; 
      selectedArrival=null; 
      
      arrivalSearch.style.display = 'block';
      arrivalSearch.value = '';
      greetingContainer.style.display = 'none';
      renderArrivalList(); 
    };

    /**
     * 🌟 티켓팅 모달 열기 및 상태 초기화 (기존 유지 + 금액 확인 로직 분리)
     */
    function showTicketModal() {
        if (!currentDeparture || !selectedArrival) return; 
        
        seatAvailabilityMap = {};
        selectedSeat = null; 
        selectedFocusMode = null; 

        boardingPassContainer.style.display = 'none'; 
        boardingPassContainer.classList.remove('show');
        
        seatSelectionContainer.style.display = 'block'; 
        seatSelectionContainer.classList.remove('collapsed'); 
        
        document.getElementById('focusModeSelector').style.display = 'block'; 
        
        reselectSeatBtn.classList.add('hidden'); 
        selectionButtons.style.display = 'flex'; 

        renderSeats();
        renderFocusModeButtons();
        updateSelectionDisplay(); 
        
        confirmSelectionBtn.disabled = true;

        arrivalList.style.display = 'none'; 
        arrivalSearch.style.display = 'none'; 
        ticketBtn.style.display='none'; 
        
        modal.style.display='flex'; 
    }
    
    /**
     * 🌟 선택 표시 업데이트 및 버튼 활성화 체크 (기존 유지)
     */
    function updateSelectionDisplay() {
        selectedSeatDisplay.textContent = selectedSeat || '좌석 없음';
        selectedFocusModeDisplay.textContent = selectedFocusMode || '모드 없음';
        
        // 좌석과 집중 모드가 모두 선택되었을 때만 발권 버튼 활성화
        if (selectedSeat && selectedFocusMode) {
            confirmSelectionBtn.disabled = false;
        } else {
            confirmSelectionBtn.disabled = true;
        }
    }

    /**
     * 🌟 좌석 선택 시 좌석 지도만 접기 (기존 유지)
     */
    function autoCollapseSeatSelection() {
        if (selectedSeat) {
            seatSelectionContainer.classList.add('collapsed');
            reselectSeatBtn.classList.remove('hidden');
        }
    }

    /**
     * 🌟 좌석 다시 선택 버튼 클릭 시 확장 처리 (기존 유지)
     */
    reselectSeatBtn.onclick = () => {
        seatSelectionContainer.classList.remove('collapsed');
        reselectSeatBtn.classList.add('hidden');
    };

    /**
     * 🌟 보딩 패스 렌더링 및 애니메이션 적용 (기존 유지)
     */
    function renderBoardingPass() {
        const depAirport = airportData[currentDeparture];
        const arrAirport = airportData[selectedArrival];
        const flightNum = generateFlightNumber();
        const gateNum = String.fromCharCode(65 + Math.floor(Math.random() * 5)) + Math.floor(Math.random() * 10);
        
        const seatRow = parseInt(selectedSeat.slice(0, -1));
        let flightClass = 'ECONOMY'; 
        if (seatRow === 1) { // 🚨 1행: 퍼스트
            flightClass = 'FIRST'; 
        } else if (seatRow >= 2 && seatRow <= 4) { // 🚨 2-4행: 비즈니스 (4열 포함)
            flightClass = 'BUSINESS'; 
        }
        
        const depLat = depAirport.lat;
        const depLon = depAirport.lon;
        const arrLat = arrAirport.lat;
        const arrLon = arrAirport.lon;
        const totalDistance = calculateDistance(depLat, depLon, arrLat, arrLon);
        initialFlightDistance = totalDistance;

        bpRoute.textContent = `${depAirport.code} → ${arrAirport.code}`;
        bpFlightNo.textContent = `FLT: ${flightNum}`;
        bpGate.textContent = `GATE: ${gateNum}`;
        bpClass.textContent = `CLASS: ${flightClass}`;
        bpSeat.textContent = selectedSeat;
        bpFocusMode.textContent = selectedFocusMode; 
        bpBarcodeText.textContent = `${flightNum}-${gateNum}-${selectedSeat}-${selectedFocusMode}-${userName || 'DUKKI'}`; 
        
        pendingFlight = {
            from: currentDeparture,
            to: selectedArrival,
            seat: selectedSeat,
            focus: selectedFocusMode,
            flightNumber: flightNum,
            time: new Date().toLocaleString(),
            distance: totalDistance, 
            duration: flightTimes[`${currentDeparture}-${selectedArrival}`] || (5*3600)
        };
        
        // 좌석/모드 선택 UI 숨기기
        seatSelectionContainer.style.display = 'none'; 
        document.getElementById('focusModeSelector').style.display = 'none'; 
        reselectSeatBtn.classList.add('hidden'); 
        selectionButtons.style.display = 'none'; 
        
        // 애니메이션을 위한 준비 및 프린트 효과 적용
        boardingPassContainer.classList.remove('show');
        boardingPassContainer.style.display = 'block';
        
        // 프린트 애니메이션 시작
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                boardingPassContainer.classList.add('show');
            });
        });

        slideHandle.style.left = '2px';
        slideBackground.style.width = '0px';
        slideTrack.classList.remove('scanned'); 
        slideText.textContent = '밀어서 티켓 스캔 🎫'; 
    }
    
    /**
     * 🚨 금액 확인 후 티켓 발권 (로직 업데이트)
     */
    confirmSelectionBtn.onclick = () => {
        if (!selectedSeat) { alert('좌석 선택이 필요합니다.'); return; }
        if (!selectedFocusMode) { alert('집중 모드 선택이 필요합니다.'); return; }
        
        const seatRow = parseInt(selectedSeat.slice(0, -1));
        let requiredMoney = 0;

        if (seatRow === 1) { // 🚨 1행: 퍼스트
            requiredMoney = 300; 
        } else if (seatRow >= 2 && seatRow <= 4) { // 🚨 2-4행: 비즈니스
            requiredMoney = 100; 
        }

        if (currentMoney < requiredMoney) {
            showPopup(`잔액이 부족합니다! 😥 (필요 금액: ${requiredMoney}원)`, 3000);
            return; 
        }

        // 금액 차감 (퍼스트/비즈니스 클래스만)
        if (requiredMoney > 0) {
            updateMoney(-requiredMoney); 
            showPopup(`잔액 ${requiredMoney}원 차감. 발권을 시작합니다.`, 3000);
        }

        // 예매 가능하면 발권 진행
        renderBoardingPass(); 
    };
    
    /**
     * 🌟 도착지 목록 렌더링 (기존 유지)
     */
    function renderArrivalList(filter = ''){
        arrivalList.innerHTML=''; 
        const filterText = filter.toLowerCase();

        if (currentDeparture) {
            arrivalList.style.display='block';
            ticketBtn.style.display='none'; 
        } else {
            arrivalList.style.display='none';
            ticketBtn.style.display='none';
        }
        
        distanceDisplay.textContent = '0 km'; 

        Object.keys(airportData).forEach(city=>{
            if(city===currentDeparture) return;
            
            const arrAirport = airportData[city];
            const searchText = `${city} ${arrAirport.code} ${arrAirport.name}`.toLowerCase();
            
            if (filterText && !searchText.includes(filterText)) {
                return;
            }

            const key=currentDeparture+'-'+city;
            const durationSec=flightTimes[key] || (5*3600); 
            const durationStr=formatTime(durationSec).replace(/ /g, '').toLowerCase(); 
            const div=document.createElement('div');
            div.className='arrival-item';
            
            div.innerHTML=`
                <div>${arrAirport.code} - ${city}</div>
                <div style="font-size: 13px; color: var(--color-text-dim); margin-top: 3px;">
                    ${arrAirport.name} - ${durationStr}
                </div>
            `;
            
            const isSelected = selectedArrival === city;
            if (selectedArrival !== null && !isSelected) {
                 div.style.display = 'none';
                 return;
            }
            
            if (isSelected) {
                div.classList.add('selected-arrival');
                ticketBtn.style.display='block';
                ticketBtn.textContent='좌석 선택';
                ticketBtn.onclick=showTicketModal; 
                ticketBtn.onmousedown = null;
            }

            div.onclick=()=>{
                arrivalSearch.style.display = 'none';

                document.querySelectorAll('.arrival-item').forEach(item => {
                    item.style.display = 'none';
                    item.classList.remove('selected-arrival');
                });
                
                div.classList.add('selected-arrival');
                div.style.display = 'block'; 
                
                selectedArrival=city;

                ticketBtn.style.display='block';
                ticketBtn.textContent='좌석 선택';
                
                ticketBtn.onclick=showTicketModal; 
                ticketBtn.onmousedown = null;
            };
            arrivalList.appendChild(div);
        });
    }

    arrivalSearch.oninput = () => {
        renderArrivalList(arrivalSearch.value);
    };

    /**
     * 🌟 좌석 렌더링 (🚨 [수정] EXIT, 구분선 수정됨)
     */
    function renderSeats(){ 
        const seatMapContainer = document.getElementById('seatMap');
        seatMapContainer.innerHTML = '';
        
        // 🚨 40열로 확장
        const totalRows = 40; 
        
        for(let r=1; r<=totalRows; r++){
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            
            let seatClass = 'E'; // Economy 기본
            let cols; // 해당 열의 좌석 배열
            let rowClass = '';

            // 1열: First (2-2-2)
            if (r === 1) {
                seatClass = 'F'; 
                cols = ['A','B', '', 'D','E', '', 'G','H'];
                rowClass = 'F';
            // 2-4열: Business (3-3-3)
            } else if (r >= 2 && r <= 4) {
                seatClass = 'B'; 
                cols = ['A','B','C', '', 'D','E','F', '', 'G','H','I'];
                rowClass = 'B';
            // 5-40열: Economy (3-3-3)
            } else {
                seatClass = 'E'; 
                cols = ['A','B','C', '', 'D','E','F', '', 'G','H','I'];
                rowClass = 'E';
            }
            
            rowDiv.dataset.class = rowClass;

            // 🚨 화장실 및 통로 표시 (수정됨)
            if (r === 1) {
                const facilityDiv = document.createElement('div');
                facilityDiv.className = 'section-facility';
                facilityDiv.innerHTML = `<span class="facility-item lav-left">🚽</span> <span class="facility-item lav-right">🚽</span>`;
                seatMapContainer.appendChild(facilityDiv);
            }
            
            if (r === 2) {
                const separator = document.createElement('div');
                separator.className = 'section-separator';
                separator.textContent = ''; // 🚨 텍스트 제거
                seatMapContainer.appendChild(separator);
            }
            
            if (r === 5) {
                const facilityDiv = document.createElement('div');
                facilityDiv.className = 'section-facility';
                // 🚨 'exit-center'를 'exit-left'와 'exit-right'로 변경
                facilityDiv.innerHTML = `<span class="facility-item exit-left">🚪 EXIT</span> <span class="facility-item exit-right">🚪 EXIT</span>`;
                seatMapContainer.appendChild(facilityDiv);
                
                const separator = document.createElement('div');
                separator.className = 'section-separator';
                separator.textContent = ''; // 🚨 텍스트 제거
                seatMapContainer.appendChild(separator);
            }
            
            if (r === 20 || r === 35) {
                const facilityDiv = document.createElement('div');
                facilityDiv.className = 'section-facility';
                // 🚨 'exit-center'를 'exit-left'와 'exit-right'로 변경 (화장실 제거)
                facilityDiv.innerHTML = `<span class="facility-item exit-left">🚪 EXIT</span> <span class="facility-item exit-right">🚪 EXIT</span>`;
                seatMapContainer.appendChild(facilityDiv);
                
                const separator = document.createElement('div');
                separator.className = 'section-separator';
                separator.textContent = ''; // 🚨 텍스트 제거
                seatMapContainer.appendChild(separator);
            }
            // ------------------------

            cols.forEach((col, idx)=>{
                if(col === ''){
                    const aisle = document.createElement('div');
                    aisle.className = 'aisle';
                    
                    if (rowClass === 'F') { // 2-2-2 배열 통로
                        if (idx === 2 || idx === 5) {
                            aisle.style.width = '25px'; 
                        } else {
                            aisle.style.width = '15px'; 
                        }
                    } else { // 3-3-3 배열 통로
                        if (idx === 3 || idx === 7) { 
                             aisle.style.width = '20px'; 
                        } else {
                             aisle.style.width = '15px'; 
                        }
                    }
                    rowDiv.appendChild(aisle);
                } else {
                    const seat = document.createElement('div');
                    seat.className = 'seat';
                    const seatId = `${r}${col}`;
                    seat.dataset.seat = seatId;
                    seat.dataset.class = seatClass; 
                    
                    seat.textContent = seatId; 

                    let isAvailable;
                    if (seatAvailabilityMap.hasOwnProperty(seatId)) {
                        isAvailable = seatAvailabilityMap[seatId];
                    } else {
                        isAvailable = isSeatAvailable(seatClass);
                        seatAvailabilityMap[seatId] = isAvailable; 
                    }
                    
                    // 🚨 40열에 맞추기 위한 임의의 좌석 예약 불가능 처리 (예: 40열의 D, E, F 좌석)
                    if (r === 40 && (col === 'D' || col === 'E' || col === 'F')) {
                         isAvailable = false; 
                         seatAvailabilityMap[seatId] = isAvailable;
                    }
                    
                    if (!isAvailable) {
                        seat.classList.add('unavailable');
                    }

                    if (selectedSeat === seatId) {
                        seat.classList.add('selected');
                    }
                    
                    seat.onclick = ()=>{
                        if (!isAvailable) {
                            showPopup("이미 예약된 좌석입니다. 다른 좌석을 선택해주세요.", 2000);
                            return;
                        }
                        
                        document.querySelectorAll('#seatMap .seat').forEach(s=>s.classList.remove('selected'));
                        seat.classList.add('selected');
                        
                        selectedSeat = seat.dataset.seat;
                        updateSelectionDisplay(); 
                        autoCollapseSeatSelection(); 
                    };
                    rowDiv.appendChild(seat);
                }
            });
            seatMapContainer.appendChild(rowDiv);
            
            // 🚨 40열 다음에 화장실/EXIT 표시 (수정됨)
            if (r === 40) {
                 const facilityDiv = document.createElement('div');
                facilityDiv.className = 'section-facility';
                
                // 🚨 [수정] 후방 EXIT를 가장 양옆으로 배치 (auto-margin 클래스 제거, flex space-between 활용)
                facilityDiv.innerHTML = `
                    <span class="facility-item" style="color: var(--color-accent-red); font-weight: bold;">🚪 EXIT</span>
                    <span class="facility-item">🚽</span>
                    <span class="facility-item">🚽</span>
                    <span class="facility-item" style="color: var(--color-accent-red); font-weight: bold;">🚪 EXIT</span>
                `;
                seatMapContainer.appendChild(facilityDiv);
            }
        }
    }

    /**
     * 🌟 집중 모드 렌더링 (기존 유지)
     */
    function renderFocusModeButtons(){ 
        focusModeButtonsContainer.innerHTML = '';

        const focusModes = [
            { mode: 'STUDY', emoji: '📚', color: '#0077ff' }, 
            { mode: 'BOOK', emoji: '📖', color: '#28a745' },  
            { mode: 'MUSIC', emoji: '🎧', color: '#ffc107' }, 
            { mode: 'REST', emoji: '💤', color: '#dc3545' }   
        ];
        
        focusModes.forEach(item => {
            const button = document.createElement('button');
            button.className = 'focus-button';
            button.innerHTML = `${item.emoji} ${item.mode}`;
            button.dataset.mode = item.mode;
            
            button.style.backgroundColor = item.color;

            if (selectedFocusMode === item.mode) {
                 button.classList.add('selected');
            }

            button.onclick = () => {
                document.querySelectorAll('.focus-button').forEach(b => b.classList.remove('selected'));
                button.classList.add('selected');
                selectedFocusMode = item.mode;
                updateSelectionDisplay(); 
            };

            focusModeButtonsContainer.appendChild(button);
        });
    }

    // 5초 꾹 누름 로직 (기존 유지)
    function handleStopFlightStart(event) {
        event.preventDefault(); 
        if (pressTimer) return;
        const startTime = Date.now();
        
        ticketBtn.style.setProperty('--progress', '0%');
        ticketBtn.style.transition = 'background-image 0.05s linear'; 
        
        pressTimer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(1, elapsedTime / PRESS_DURATION);
            const progressPercent = progress * 100;

            ticketBtn.style.setProperty('--progress', `${progressPercent}%`);
            ticketBtn.style.backgroundImage = `linear-gradient(to right, var(--color-accent-red) ${progressPercent}%, var(--color-primary) ${progressPercent}%)`;


            
            if (progress >= 1) {
                handleStopFlightEnd(); 
                realStopFlight(); 
            }
        }, 50); 
    }

    function handleStopFlightEnd() { 
        if (pressTimer) {
            clearInterval(pressTimer);
            pressTimer = null;
        }
        ticketBtn.style.setProperty('--progress', '0%');
        ticketBtn.style.backgroundImage = 'linear-gradient(to right, var(--color-accent-red) 0%, var(--color-primary) 0%)';
        ticketBtn.style.transition = 'none'; 
    }

    function realStopFlight() { 
        alert("비행이 강제 중지되었습니다. 집중 모드를 이탈했습니다. 🛑");
        timerDisplayPreFlight.style.display = 'block';  
document.querySelector('.timer-box-time').style.display = 'none';  
focusStatus.style.display = 'none';  
document.querySelector('.timer-box-clock').style.display = 'none';  
document.querySelector('.timer-box-distance').style.display = 'none';  
        saveFlightRecord(); 
        stopFlight(false); 
    }
    
    document.getElementById('closeModalBtn').onclick=()=>{ 
        modal.style.display='none';
        document.getElementById('focusModeSelector').style.display = 'block'; 
        arrivalSearch.style.display = 'block';
        renderArrivalList(arrivalSearch.value); 
        if (userName) updateGreeting(userName);
    };
    
    
    // ----------------------------------------------------
    // 🚀 슬라이더 드래그 로직 (기존 유지)
    // ----------------------------------------------------
    let isDragging = false;
    let startOffset = 0; 
    const SLIDE_THRESHOLD = 0.9; 
    const HANDLE_WIDTH = 40;
    const TRACK_PADDING = 2; 

    function getX(event) {
        if (event.touches) {
            return event.touches[0].clientX;
        }
        return event.clientX;
    }

    slideTrack.addEventListener('mousedown', startDrag);
    slideTrack.addEventListener('touchstart', startDrag);

    function startDrag(event) {
        if (slideTrack.classList.contains('scanned')) return; 

        isDragging = true;
        slideTrack.classList.add('sliding');
        
        const clientX = getX(event);
        const trackRect = slideTrack.getBoundingClientRect();
        const handleRect = slideHandle.getBoundingClientRect();

        if (clientX >= handleRect.left && clientX <= handleRect.right) {
            startOffset = clientX - handleRect.left;
        } else {
            startOffset = HANDLE_WIDTH / 2;
        }
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);

        slideTrack.style.cursor = 'grabbing';
        event.preventDefault(); 
    }

    function drag(event) {
        if (!isDragging) return;

        const clientX = getX(event);
        const trackRect = slideTrack.getBoundingClientRect();
        
        const maxLeft = trackRect.width - HANDLE_WIDTH - TRACK_PADDING;
        let newLeft = clientX - trackRect.left - startOffset;

        newLeft = Math.max(TRACK_PADDING, newLeft);
        newLeft = Math.min(maxLeft, newLeft);
        
        slideHandle.style.left = `${newLeft}px`;
        
        const backgroundWidth = newLeft + (HANDLE_WIDTH / 2) - TRACK_PADDING;
        slideBackground.style.width = `${backgroundWidth}px`;

        event.preventDefault(); 
    }

    function endDrag(event) {
        if (!isDragging) return;
        isDragging = false;
        slideTrack.classList.remove('sliding');

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);

        slideTrack.style.cursor = 'grab';

        const trackRect = slideTrack.getBoundingClientRect();
        const handleLeft = slideHandle.offsetLeft;
        
        const slideDistance = handleLeft - TRACK_PADDING;
        const maxSlideDistance = trackRect.width - HANDLE_WIDTH - (2 * TRACK_PADDING);
        const slideRatio = slideDistance / maxSlideDistance;
        
        if (slideRatio >= SLIDE_THRESHOLD) {
            slideTrack.classList.add('scanned');
            slideHandle.style.left = `${trackRect.width - HANDLE_WIDTH - TRACK_PADDING}px`; 
            slideBackground.style.width = `${trackRect.width}px`; 
            slideHandle.style.backgroundColor = '#28a745'; 
            
            slideText.textContent = '티켓 스캔 완료 ✅';

            // 🚀 비행 시작 로직 호출
            startFlight(); 
        } else {
            // 원위치 복귀
            slideHandle.style.transition = 'left 0.3s ease-in-out';
            slideBackground.style.transition = 'width 0.3s ease-in-out';
            slideHandle.style.left = '2px';
            slideBackground.style.width = '0px';

            setTimeout(() => {
                slideHandle.style.transition = 'none';
                slideBackground.style.transition = 'none';
            }, 300); 
        }
    }
    // ------------------------------------
    
    // ----------------------------------------------------
    // ✈️ 비행 시작/중지/저장 핵심 로직 (업데이트)
    // ----------------------------------------------------
    
    /**
     * 🚀 비행 시작
     */
    function startFlight() {
        if(!pendingFlight){ 
            alert('비행 정보가 올바르지 않습니다. 다시 선택해주세요.'); 
            modal.style.display='none';
            renderArrivalList();
            return; 
        }

        showPopup("티켓이 스캔되었습니다. 비행을 시작합니다! 🛫", 3000);

        // 자동 재생 시도: 비행 시작은 사용자의 제스처(슬라이드)로 유발되므로
        // 대부분의 브라우저에서 play()가 허용됩니다. 실패하면 안내 팝업을 띄웁니다.
        if (backgroundMusic) {
            try {
                backgroundMusic.currentTime = 0;
                const playPromise = backgroundMusic.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // 자동 재생이 차단된 경우 사용자에게 간단 안내
                        showPopup('브라우저 자동 재생 정책으로 음악이 차단되었습니다. 화면을 한 번 터치하면 음악이 재생됩니다.', 4000);
                    });
                }
            } catch (e) {
                console.warn('backgroundMusic play failed', e);
            }
        }

        const focus = pendingFlight.focus;
        const depAirport = airportData[pendingFlight.from];
        const arrAirport = airportData[pendingFlight.to];
        const duration = pendingFlight.duration;
        const totalDistance = pendingFlight.distance;
        
        selectedArrival = pendingFlight.to; // 현지 시간 계산을 위해 설정
        updateClocks(); 

        modal.style.display='none';
        
        // 🔄 타이머 UI를 비행 중 모드로 전환  
timerContainer.classList.add('is-flight-active');  
timerDisplayPreFlight.style.display = 'none';  
document.querySelector('.timer-box-time').style.display = 'block';  
focusStatus.style.display = 'block';  
document.querySelector('.timer-box-clock').style.display = 'block';  
document.querySelector('.timer-box-distance').style.display = 'block';  

        // 🆕 📍/☝️ 버튼 표시
        toggleFollowBtn.style.display = 'flex'; 
        
        // 💰 돈 버튼 비행 중 위치로 이동
        moneyButton.classList.add('in-flight');

        // 출발/도착 공항 마커 표시
        const depLatLng = [depAirport.lat, depAirport.lon];
        const arrLatLng = [arrAirport.lat, arrAirport.lon];

        if (departureAirportMarker) map.removeLayer(departureAirportMarker);
        if (arrivalAirportMarker) map.removeLayer(arrivalAirportMarker);

        departureAirportMarker = L.marker(depLatLng, {
            icon: createAirportIcon(depAirport.code, true)
        }).addTo(map);
        
        arrivalAirportMarker = L.marker(arrLatLng, {
            icon: createAirportIcon(arrAirport.code, false)
        }).addTo(map);

        // 🗺️ 비행 시작 시, 따라가기 모드 (autoFollow=true)로 설정
        autoFollow = true;
        followIcon.textContent = '📍';
        //map.setZoom(13);





        // 비행 중 UI 설정
        ticketBtn.textContent='비행 중지 (5초 꾹)'; 
        
        focusStatus.textContent = focus; 
        
        ticketBtn.classList.add('disabled-during-flight'); 

        departureSelect.style.display = 'none'; 
        arrivalList.style.display = 'none'; 
        arrivalSearch.style.display = 'none'; 
        departureSearch.style.display = 'none'; 
        controlsContainer.classList.add('controls-disabled'); 
        greetingContainer.style.display = 'none'; 

        // 비행 정보 표시
        selectedFlightInfo.innerHTML = `
            <div style="font-size: 20px; font-weight: 900; color: var(--color-primary); margin-bottom: 8px;">
                ${depAirport.code} → ${arrAirport.code}
            </div>
            <div class="flight-subtitle" style="margin-bottom: 4px;">
                좌석 | ${pendingFlight.seat}
            </div>
            <div style="font-size: 14px; color: var(--color-text-light); margin-top: 4px;">
                출발 | ${depAirport.name}
            </div>
            <div style="font-size: 14px; color: var(--color-text-light);">
                도착 | ${arrAirport.name}
            </div>
        `;
        selectedFlightInfo.style.display = 'flex'; 
        ticketBtn.style.display='block'; 
        
        // 비행 중지 버튼 이벤트 연결
        ticketBtn.onclick = null; 
        ticketBtn.onmousedown = handleStopFlightStart;
        ticketBtn.onmouseup = handleStopFlightEnd;
        ticketBtn.onmouseleave = handleStopFlightEnd; 
        ticketBtn.ontouchstart = handleStopFlightStart;
        ticketBtn.ontouchend = handleStopFlightEnd;
        ticketBtn.ontouchcancel = handleStopFlightEnd;

        distanceDisplay.textContent = `${totalDistance.toFixed(0)} km`; 
        initialFlightDistance = totalDistance; 

        startTimer(duration, focus); 
        
        moveMarkerWithTimer(depLatLng,
                            arrLatLng,
                            duration,
                            ()=>{ 
                                departureSearch.style.display = 'block';
                                renderDepartureSelect(); 
                                departureSelect.value = pendingFlight.to; 
                                currentDeparture = pendingFlight.to;
                                renderArrivalList();
                                
                                const toAirport = airportData[pendingFlight.to];
                                map.setView([toAirport.lat, toAirport.lon], 13);
                            });
    }

    /**
     * 🛑 비행 중지 
     * @param {boolean} isCompleted - 타이머 만료로 정상 완료되었는지 여부
     */
    function stopFlight(isCompleted) { 
        
        handleStopFlightEnd(); 
        clearInterval(timerInterval);

        // 비행 종료 시 오디오 자동 정지 및 재시작 위치 리셋
        if (backgroundMusic) {
            try {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
            } catch (e) {
                console.warn('backgroundMusic pause/reset failed', e);
            }
        }
        
        // 🔄 타이머 UI를 비행 전 모드로 전환.               initializeTimerUI();  

        
        // 🆕 📍/☝️ 버튼 숨김
        toggleFollowBtn.style.display = 'none'; 
        
        // 💰 돈 버튼 기본 위치로 복귀
        moneyButton.classList.remove('in-flight');

        // 🆕 좌석 예약 가능성 맵 초기화
        seatAvailabilityMap = {};
        lastMoneyGainDistance = 0;

        // 맵 요소 제거
        if(flightMarker) map.removeLayer(flightMarker);
        if(flightLine) map.removeLayer(flightLine);
        if(departureAirportMarker) map.removeLayer(departureAirportMarker);
        if(arrivalAirportMarker) map.removeLayer(arrivalAirportMarker);

        flightMarker=null; flightLine=null;
        departureAirportMarker=null;
        arrivalAirportMarker=null;
        
        timerSeconds=0;
        initialFlightDistance = 0; 
        
        selectedArrival = null; 

        // 🗺️ 비행 종료 시, 따라가기 모드 (autoFollow=true)로 재설정하고 줌 레벨을 2로 변경
        autoFollow = true;
        followIcon.textContent = '📍';
        map.setZoom(2);
        
        // 비행 종료 UI 설정
        controlsContainer.classList.remove('controls-disabled'); 
        ticketBtn.classList.remove('disabled-during-flight');
        
        ticketBtn.onmousedown = null;
        ticketBtn.onmouseup = null;
        ticketBtn.onmouseleave = null;
        ticketBtn.ontouchstart = null;
        ticketBtn.ontouchend = null;
        ticketBtn.ontouchcancel = null;

        selectedFlightInfo.style.display='none'; 
        departureSelect.style.display = 'block';
        departureSearch.style.display = 'block'; 
        
        if (!isCompleted) {
             departureSelect.value=''; 
             currentDeparture=null;
             renderDepartureSelect(); 
        }
        
        if (userName) {
            updateGreeting(userName); 
        }

        arrivalList.style.display='none'; 
        arrivalSearch.style.display = 'none'; 
        ticketBtn.style.display='none'; 
        
        pendingFlight=null;
        ticketBtn.textContent='좌석 선택';

        hideAllContainers();
        document.getElementById('map').style.display='block';
        bottomNavUpdateActive('homeBtn');
    }

    /**
     * 💾 비행 기록 저장 (기존 유지)
     */
    function saveFlightRecord(){ 
        if(!pendingFlight) return;
        
        const remainingTime = timerSeconds; 
        const totalDuration = pendingFlight.duration;
        const focusDuration = totalDuration - remainingTime; 
        const focusPercentage = (totalDuration > 0) ? ((focusDuration / totalDuration) * 100).toFixed(1) : 0;

        pendingFlight.completionTime = new Date().toLocaleString();
        pendingFlight.focusDuration = focusDuration; 
        pendingFlight.focusPercentage = focusPercentage; 

        let records=JSON.parse(localStorage.getItem('focusFlightRecords')||'[]');
        records.push(pendingFlight);
        localStorage.setItem('focusFlightRecords',JSON.stringify(records));
        renderRecords(currentRecordFilter); 
        renderTrends(); 
    }
    
    // ----------------------------------------------------
    // 📜 기록 및 추세 렌더링 (기존 유지)
    // ----------------------------------------------------

    function renderRecords(filter = 'all'){ 
        currentRecordFilter = filter; 
        const container=document.getElementById('records');
        container.innerHTML='';
        let records=JSON.parse(localStorage.getItem('focusFlightRecords')||'[]');
        
        let filteredRecords = records;
        if (filter === 'completed') {
            filteredRecords = records.filter(r => (r.focusDuration >= r.duration));
        } else if (filter === 'incomplete') {
            filteredRecords = records.filter(r => (r.focusDuration < r.duration));
        }
        
        document.querySelectorAll('.record-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        if (records.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--color-text-dim); margin-top:30px;">아직 비행 기록이 없습니다. 첫 비행을 시작하세요! 🛫</p>`;
            return;
        }
        
        if (filteredRecords.length === 0) {
            let msg = '기록이 없습니다.';
            if (filter === 'completed') msg = '완료된 비행 기록이 없습니다. 😔';
            else if (filter === 'incomplete') msg = '중단된 비행 기록이 없습니다. 🥳';
            
            container.innerHTML = `<p style="text-align:center; color:var(--color-text-dim); margin-top:30px;">${msg}</p>`;
            return;
        }

        filteredRecords.slice().reverse().forEach(r=>{ 
            const depCode = airportData[r.from]?.code || 'N/A';
            const arrCode = airportData[r.to]?.code || 'N/A';
            
            const focusedTimeSec = r.focusDuration || 0;
            const focusedTimeStr = formatTime(focusedTimeSec); 
            const ratio = r.duration > 0 ? (focusedTimeSec / r.duration) : 0;
            const actualDistance = (r.distance || 0) * ratio;
            const distanceKm = actualDistance?.toFixed(0) || '0';
            
            const isCompleted = r.focusDuration >= r.duration;

            const completionStatus = isCompleted 
                ? `<span style="color:#28a745; font-weight:bold;">완료</span>` 
                : `<span style="color:var(--color-accent-red); font-weight:bold;">중단 (${(r.focusPercentage || '0.0')}% 집중)</span>`;

            const div=document.createElement('div');
            div.className='ticket-item';
            div.innerHTML=`
                <div class="ticket-main">
                    <div>
                        <div class="ticket-header">${depCode} → ${arrCode}</div>
                        <div class="ticket-time-code">모드: <span class="ticket-info-value">${r.focus}</span></div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:24px; font-weight:900; color:#ff5555;">${focusedTimeStr.split(' ')[0]}</div>
                        <div style="font-size:12px; color:var(--color-text-dim);">${focusedTimeStr.split(' ').slice(1).join(' ')}</div>
                    </div>
                </div>
                <div class="ticket-info-panel">
                    <div><span class="ticket-info-label">FLIGHT NO:</span> <span class="ticket-info-value">${r.flightNumber}</span></div>
                    <div><span class="ticket-info-label">SEAT:</span> <span class="ticket-info-value">${r.seat}</span></div>
                    <div><span class="ticket-info-label">STATUS:</span> ${completionStatus}</div>
                    <div><span class="ticket-info-label">DISTANCE:</span> ${distanceKm} km</div>
                    <div style="width: 100%;"><span class="ticket-info-label">DATE:</span> ${r.time}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    function renderTrends(){ 
        const records = JSON.parse(localStorage.getItem('focusFlightRecords') || '[]');
        const trendsData = document.getElementById('trendsData');
        trendsData.innerHTML = '';
        
        if (records.length === 0) {
            trendsData.innerHTML = `<p style="text-align:center; color:var(--color-text-dim); grid-column: 1 / 3; margin-top:20px;">비행 기록이 부족하여 분석을 할 수 없습니다. 😔</p>`;
            return;
        }
        
        const totalFlights = records.length;
        
        const completedRecords = records.filter(r => r.focusDuration >= r.duration);
        const completionRate = (totalFlights > 0) ? ((completedRecords.length / totalFlights) * 100).toFixed(0) : 0;

        const totalDurationSeconds = records.reduce((sum, r) => sum + (r.focusDuration ? r.focusDuration : 0), 0);
        const totalDurationFormatted = formatTime(totalDurationSeconds);
        
        const visitedAirports = new Set();
        records.forEach(r => {
            if (r.from) visitedAirports.add(r.from);
            if (r.to) visitedAirports.add(r.to);
        });
        const totalAirports = visitedAirports.size;

        const totalDistance = records.reduce((sum, r) => {
            if (r.focusDuration > 0 && r.distance && r.duration > 0) {
                const ratio = r.duration > 0 ? (r.focusDuration / r.duration) : 0;
                const actualDistance = r.distance * ratio;
                return sum + actualDistance;
            }
            return sum;
        }, 0);
        const totalDistanceFormatted = `${totalDistance.toFixed(0)}`;

        const focusModeCounts = records.reduce((acc, r) => {
            if(r.focus) { 
                 acc[r.focus] = (acc[r.focus] || 0) + 1;
            }
            return acc;
        }, {});
        
        let mostUsedMode = 'N/A';
        let maxCount = 0;
        for (const mode in focusModeCounts) {
            if (focusModeCounts[mode] > maxCount) {
                maxCount = focusModeCounts[mode];
                mostUsedMode = mode;
            }
        }
        
        const trendItems = [
            { label: "총 비행 횟수", value: totalFlights, unit: "회", type: "count" },
            { label: "비행 성공률", value: completionRate, unit: "%", type: "percent" }, 
            { label: "총 집중 시간", value: totalDurationFormatted, unit: "", type: "time" },
            { label: "총 이동 거리", value: totalDistanceFormatted, unit: "km", type: "distance" },
            { label: "최다 집중 모드", value: mostUsedMode, unit: "", count: maxCount, type: "mode" },
            { label: "방문 공항 수", value: totalAirports, unit: "곳", type: "count" },
        ];
        
        const modeItem = trendItems.splice(4, 1)[0]; 
        trendItems.push(modeItem);

        trendsData.style.gridTemplateColumns = '1fr 1fr'; 
        
        trendItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'trend-item';
            
            let htmlContent = '';
            
            if (item.type === "time") {
                const parts = item.value.split(' ');
                htmlContent = `<div class="trend-label">${item.label}</div>
                                 <div class="trend-value" style="font-size:20px;">${parts.slice(0, 3).join(' ')}</div>
                                 <div style="font-size:12px; color:var(--color-text-dim);">시간/분/초</div>`;
            } else if (item.type === "mode") {
                const emojiMap = {
                    'STUDY': '📚', 'BOOK': '📖', 'MUSIC': '🎧', 'REST': '💤', 'N/A': '⭐'
                };
                const emoji = emojiMap[item.value] || '⭐';
                
                htmlContent = `<div class="trend-label">${item.label}</div>
                                 <div class="trend-value" style="font-size: 24px;">${emoji} ${item.value}</div>
                                 <div style="font-size:12px; color:var(--color-text-dim);">${item.count}회 사용</div>`;
                div.style.gridColumn = '1 / 3'; 
            } else {
                htmlContent = `<div class="trend-label">${item.label}</div>
                                 <div class="trend-value">${item.value}</div>
                                 <div style="font-size:12px; color:var(--color-text-dim);">${item.unit}</div>`;
            }
            
            div.innerHTML = htmlContent;
            trendsData.appendChild(div);
        });
    }
    // -----------------------------

    renderRecords(currentRecordFilter); 
    renderTrends(); 

    
    // ----------------------------------------------------
    // 🧭 하단 네비게이션 및 설정 이벤트 (기존 유지)
    // ----------------------------------------------------
    
    function hideAllContainers() {
        document.getElementById('map').style.display='none';
        recordsContainer.style.display='none';
        trendsContainer.style.display='none';
        settingsModal.style.display='none'; 
        shopContainer.style.display='none'; // ⬅️ [수정] 상점 컨테이너 숨기기 추가
        if (!pendingFlight && userName) {
            updateGreeting(userName);
        } else {
             greetingContainer.style.display='none';
        }
    }

    function bottomNavUpdateActive(activeId) {
        bottomNavButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === activeId) {
                btn.classList.add('active');
            }
        });
    }

    document.getElementById('homeBtn').onclick=()=>{ 
        if (pendingFlight) return; 
        hideAllContainers();
        document.getElementById('map').style.display='block'; 
        bottomNavUpdateActive('homeBtn');
    };
    document.getElementById('recordBtn').onclick=()=>{ 
        if (pendingFlight) return; 
        hideAllContainers();
        greetingContainer.style.display = 'none';
        renderRecords(currentRecordFilter);
        recordsContainer.style.display='block'; 
        bottomNavUpdateActive('recordBtn');
    };
    document.getElementById('trendsBtn').onclick=()=>{ 
        if (pendingFlight) return;
        hideAllContainers();
        greetingContainer.style.display = 'none';
        renderTrends();
        trendsContainer.style.display='block'; 
        bottomNavUpdateActive('trendsBtn');
    };

    document.getElementById('shopBtn').onclick = () => { // ⬅️ [신규] 상점 버튼 핸들러
        if (pendingFlight) return;
        hideAllContainers();
        greetingContainer.style.display = 'none';
        shopContainer.style.display = 'flex'; // 'flex'로 설정
        bottomNavUpdateActive('shopBtn');
    };

    document.getElementById('settingsBtn').onclick = () => { 
        if (pendingFlight) return;
        hideAllContainers();
        document.getElementById('map').style.display='block';
        settingsModal.style.display = 'flex';
        bottomNavUpdateActive('settingsBtn');
    };
    
    document.querySelectorAll('.close-container-btn').forEach(btn => {
        btn.onclick = () => {
            hideAllContainers(); 
            document.getElementById('map').style.display = 'block'; 
            bottomNavUpdateActive('homeBtn');
        };
    });

    closeShopBtn.onclick = () => { // ⬅️ [신규] 상점 닫기 버튼 핸들러
        hideAllContainers(); 
        document.getElementById('map').style.display = 'block'; 
        bottomNavUpdateActive('homeBtn');
    };
    
    recordFilterButtons.forEach(btn => {
        btn.onclick = (e) => {
            const filter = e.target.dataset.filter;
            renderRecords(filter);
        };
    });

    clearRecordsBtn.onclick = () => { 
        const confirmClear = confirm("정말로 모든 여행 기록을 초기화(삭제) 하시겠습니까?\n이 작업은 되돌릴 수 없습니다.");
        
        if (confirmClear) {
            localStorage.removeItem('focusFlightRecords');
            localStorage.setItem('focusFlightMoney', 1); // 돈도 초기화
            initializeMoneyUI(); 
            renderRecords('all'); 
            renderTrends();
            alert("여행 기록이 초기화되었습니다.");
        }
    };

    closeSettingsModalBtn.onclick = () => {
        settingsModal.style.display = 'none';
        bottomNavUpdateActive('homeBtn');
    };

    document.querySelectorAll('.map-style-button').forEach(button => {
        button.onclick = (e) => {
            const style = e.target.dataset.style;
            switchMapStyle(style);
        };
    });
    
    // ----------------------------------------------------
    // 💾 데이터 내보내기/불러오기 기능 추가
    // ----------------------------------------------------

    /**
     * 📤 LocalStorage 데이터 내보내기 (.json 파일로 저장)
     */
    window.exportData = function() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('focusFlight')) {
                 data[key] = localStorage.getItem(key);
            }
        }

        const dataJson = JSON.stringify(data, null, 2);
        const blob = new Blob([dataJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        a.download = `focusFlight_backup_${dateStr}.json`;
        a.click();
        
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
    initializeMoneyUI(); 
    
}); 