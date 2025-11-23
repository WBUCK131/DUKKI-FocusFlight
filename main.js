document.addEventListener('DOMContentLoaded', function() {

    // 🔑 Mapbox Access Token
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpbm1pbjAxMzEiLCJhIjoiY21pYnEyMjQwMGd2aDJsb2thdjlieDRqeSJ9.mhkwNK3XV_78qpwrTuyAbQ'; 

    // 🗺️ 공항 데이터
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

    // ✈️ 비행 시간 계산
    const flightTimes = {};
    const cities = Object.keys(airportData);
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
    
    // 수동 시간 조정
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
    // ⚙️ 전역 변수
    // ----------------------------------------------------
    let currentDeparture=null;
    let selectedArrival=null;
    let selectedSeat=null; 
    let selectedFocusMode=null; 
    let pendingFlight=null;
    let timerInterval=null;
    let timerSeconds=0;
    // Mapbox Marker 참조 변수
    let flightMarker=null;
    let departureAirportMarker=null;
    let arrivalAirportMarker=null;

    let autoFollow=true; 
    let initialFlightDistance = 0; 
    let userName = null; 
    let currentRecordFilter = 'all'; 
    let pressTimer = null;
    const PRESS_DURATION = 5000; 
    let seatAvailabilityMap = {};
    let currentMoney = parseInt(localStorage.getItem('focusFlightMoney')) || 1;
    let lastMoneyGainDistance = 0; 
    const MONEY_GAIN_PER_KM = 5 / 20; 
    
    // 🚀 비행 상태 제어 변수
    let isFlying = false;

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
    const trendsData = document.getElementById('trendsData');
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
    const shopBtn = document.getElementById('shopBtn');
    const shopContainer = document.getElementById('shopContainer');
    const closeShopBtn = document.getElementById('closeShopBtn');
    const stampAnimation = document.getElementById('stampAnimation');
    const toggleFollowBtn = document.getElementById('toggleFollowBtn');
    const followIcon = document.getElementById('followIcon');
    const backgroundMusic = document.getElementById('backgroundMusic'); 
    const currentTimeDisplay = document.getElementById('currentTimeDisplay');
    const localTimeDisplay = document.getElementById('localTimeDisplay');
    const moneyButton = document.getElementById('moneyButton');
    const moneyDisplay = document.getElementById('moneyDisplay');

    try { backgroundMusic.preload = 'auto'; backgroundMusic.volume = 0.6; } catch (e) {}

    // UI 초기화 함수들
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
    function initializeMoneyUI() {
        currentMoney = parseInt(localStorage.getItem('focusFlightMoney')) || 1; 
        moneyDisplay.textContent = currentMoney;
        moneyButton.classList.remove('in-flight'); 
    }
    initializeTimerUI(); 
    initializeMoneyUI(); 

    // ----------------------------------------------------
    // 🌍 Mapbox 3D 지도 초기화
    // ----------------------------------------------------
    
    // Mapbox 스타일 정의
    const mapStyles = {
        'satellite': 'mapbox://styles/mapbox/satellite-streets-v12',
        '2d': 'mapbox://styles/mapbox/streets-v12',
        '2d-dark': 'mapbox://styles/mapbox/dark-v11'
    };

    const savedStyleKey = localStorage.getItem('focusFlightMapStyle') || 'satellite';
    const initialStyle = mapStyles[savedStyleKey] || mapStyles['satellite'];

    // Mapbox 지도 객체 생성
    const map = new mapboxgl.Map({
        container: 'map',
        style: initialStyle,
        projection: 'globe',
        center: [127, 37],
        zoom: 1.5,
        attributionControl: false
    });

    map.on('style.load', () => {
        map.setFog({
            'color': 'rgb(186, 210, 235)', 
            'high-color': 'rgb(36, 92, 223)', 
            'horizon-blend': 0.02, 
            'space-color': 'rgb(11, 11, 25)', 
            'star-intensity': 0.6 
        });
    });

    function switchMapStyle(styleKey) {
        const styleUrl = mapStyles[styleKey];
        if (styleUrl) {
            map.setStyle(styleUrl);
            localStorage.setItem('focusFlightMapStyle', styleKey);
            
            map.once('style.load', () => {
                map.setFog({
                    'color': 'rgb(186, 210, 235)', 
                    'high-color': 'rgb(36, 92, 223)', 
                    'horizon-blend': 0.02, 
                    'space-color': 'rgb(11, 11, 25)', 
                    'star-intensity': 0.6 
                });
            });
        }
        
        document.querySelectorAll('.map-style-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.style === styleKey) btn.classList.add('active');
        });
    }

    // 마커 생성 헬퍼
    function createMarkerElement(className, htmlContent) {
        const el = document.createElement('div');
        el.className = className;
        el.innerHTML = htmlContent;
        el.style.display = 'block';
        return el;
    }

    function createAirportIconElement(code, isDeparture) {
        const className = `airport-marker-icon ${isDeparture ? 'departure' : 'arrival'}`;
        const html = `${isDeparture ? '🛫' : '🛬'} <span>${code}</span>`;
        return createMarkerElement(className, html);
    }

    // 🌟 flight.png 파일 사용
    function createAirplaneElement() {
        const el = document.createElement('div');
        el.className = 'airplane-div-icon';
        el.innerHTML = `<img src="flight.png" class="plane-img" style="width:40px; height:40px; display:block;">`;
        el.style.width = '40px';
        el.style.height = '40px';
        return el;
    }

    // 지도 이동 관련
    function toggleFollow() {
        autoFollow = !autoFollow;
        if (autoFollow) {
            followIcon.textContent = '📍'; 
            if (flightMarker) {
                // 따라가기 모드 시 줌 레벨 유지하며 이동
                map.easeTo({ center: flightMarker.getLngLat(), speed: 0.5 });
            }
        } else {
            followIcon.textContent = '☝️'; 
        }
    }
    followIcon.textContent = '📍';
    toggleFollowBtn.onclick = toggleFollow;

    // 사용자 이름 및 시간 로직
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
    function showNameModal() { nameModal.style.display = 'flex'; userNameInput.value = userName || ''; userNameInput.focus(); }
    function updateGreeting(name) { greetingContainer.textContent = `${getGreeting()}, ${name} ✈️`; greetingContainer.style.display = 'block'; }
    function getGreeting() { const h = new Date().getHours(); return (h>=5&&h<12)?'굿모닝':(h>=12&&h<17)?'굿애프터눈':(h>=17&&h<22)?'굿이브닝':'굿나잇'; }

    saveNameBtn.onclick = () => {
        const inputName = userNameInput.value.trim();
        if (inputName) {
            localStorage.setItem('focusFlightUserName', inputName);
            userName = inputName;
            updateGreeting(userName);
            nameModal.style.display = 'none';
        } else { alert('이름을 입력해주세요.'); }
    };
    editNameBtn.onclick = () => { settingsModal.style.display = 'none'; nameModal.querySelector('h3').textContent = '이름 수정 ✍️'; showNameModal(); };

    let clockInterval = null;
    function updateClocks() {  
        const now = new Date();  
        const h = String(now.getHours()).padStart(2,'0');
        const m = String(now.getMinutes()).padStart(2,'0');
        currentTimeDisplay.innerHTML = `<strong>${h}:${m}</strong>`;  
      
        if (selectedArrival && airportData[selectedArrival]) {  
            const diff = airportData[selectedArrival].tzOffset - 9; 
            let localH = now.getHours() + diff;  
            if (localH >= 24) localH -= 24; else if (localH < 0) localH += 24;  
            localTimeDisplay.innerHTML = `<strong>${String(localH).padStart(2,'0')}:${m}</strong>`;  
        } else { localTimeDisplay.innerHTML = '<strong>--:--</strong>'; }  
    }  
    clockInterval = setInterval(updateClocks, 60000); 

    function updateMoney(amount) {
        currentMoney = Math.max(0, currentMoney + amount);
        moneyDisplay.textContent = currentMoney;
        localStorage.setItem('focusFlightMoney', currentMoney);
    }

    function formatTime(sec){
        const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
        return `${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;
    }
    let popupTimer = null;
    function showPopup(msg, duration) {
        if (popupTimer) clearTimeout(popupTimer);
        flightPopup.innerHTML = msg; flightPopup.style.display = 'block';
        popupTimer = setTimeout(() => { flightPopup.style.display = 'none'; }, duration);
    }
    function showStampAnimation() {
        stampAnimation.classList.add('stamp-animate');
        setTimeout(() => { stampAnimation.classList.remove('stamp-animate'); }, 4000); 
    }
    function startTimer(duration, focusMode){ 
        clearInterval(timerInterval);
        timerSeconds=duration;
        timerDisplay.textContent=formatTime(timerSeconds);
        focusStatus.textContent = focusMode; 
        timerInterval=setInterval(()=>{
            if(timerSeconds<=0){ saveFlightRecord(); showStampAnimation(); stopFlight(true); return; } 
            timerSeconds--; timerDisplay.textContent=formatTime(timerSeconds);
        },1000);
    }

    function greatCircle(startLngLat, endLngLat, steps) {
        const start = { lat: startLngLat[1], lng: startLngLat[0] };
        const end = { lat: endLngLat[1], lng: endLngLat[0] };
        
        const lat1 = start.lat * Math.PI / 180; const lon1 = start.lng * Math.PI / 180;
        const lat2 = end.lat * Math.PI / 180; const lon2 = end.lng * Math.PI / 180;
        
        const d = 2 * Math.asin(Math.sqrt(Math.sin((lat2-lat1)/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin((lon2-lon1)/2)**2));
        const path = [];
        
        for(let i=0; i<=steps; i++){
            const f = i/steps;
            const A = Math.sin((1-f)*d) / Math.sin(d);
            const B = Math.sin(f*d) / Math.sin(d);
            const x = A*Math.cos(lat1)*Math.cos(lon1) + B*Math.cos(lat2)*Math.cos(lon2);
            const y = A*Math.cos(lat1)*Math.sin(lon1) + B*Math.cos(lat2)*Math.sin(lon2);
            const z = A*Math.sin(lat1) + B*Math.sin(lat2);
            const lat = Math.atan2(z, Math.sqrt(x*x+y*y));
            const lon = Math.atan2(y, x);
            path.push([lon * 180 / Math.PI, lat * 180 / Math.PI]);
        }
        return path;
    }

    function moveMarkerWithTimer(fromLngLat, toLngLat, durationSec, callback){ 
        if(flightMarker) flightMarker.remove();
        if(departureAirportMarker) departureAirportMarker.addTo(map);
        if(arrivalAirportMarker) arrivalAirportMarker.addTo(map);

        if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }

        // flyTo 대신 jumpTo 사용
        map.jumpTo({ center: fromLngLat, zoom: 15.5, pitch: 60 });

        const fps = 30; 
        const steps = durationSec * fps;
        const path = greatCircle(fromLngLat, toLngLat, steps);

        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': { 'type': 'LineString', 'coordinates': path }
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': { 'line-join': 'round', 'line-cap': 'round' },
            'paint': { 'line-color': '#0077ff', 'line-width': 3, 'line-opacity': 0.8 }
        });

        const planeEl = createAirplaneElement();
        flightMarker = new mapboxgl.Marker({ element: planeEl, rotationAlignment: 'map' })
            .setLngLat(fromLngLat)
            .addTo(map);

        let step = 0;
        let lastCalculatedDistance = initialFlightDistance; 
        lastMoneyGainDistance = 0; 

        function calcBearing(lng1, lat1, lng2, lat2) {
            const toRad = Math.PI / 180;
            const toDeg = 180 / Math.PI;
            const dLon = (lng2 - lng1) * toRad;
            const y = Math.sin(dLon) * Math.cos(lat2 * toRad);
            const x = Math.cos(lat1 * toRad) * Math.sin(lat2 * toRad) -
                      Math.sin(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos(dLon);
            return (Math.atan2(y, x) * toDeg + 360) % 360;
        }

        function animate(){
            // 🚀 비행 중지(isFlying = false) 시 애니메이션 루프 즉시 종료
            if (!isFlying) return;

            if(step >= path.length){ 
                distanceDisplay.textContent = '0 km'; 
                showPopup("비행을 완료했습니다 좋은 여행 되세요🛬", 3000);
                if(callback) callback(); 
                return; 
            }
            
            const currentPos = path[step]; 
            flightMarker.setLngLat(currentPos);
            
            let nextIndex = Math.min(step + 5, path.length - 1); 
            let nextPos = path[nextIndex];
            if (step >= path.length - 5) nextPos = path[path.length - 1];

            const angle = calcBearing(currentPos[0], currentPos[1], nextPos[0], nextPos[1]);

            const imgEl = planeEl.querySelector('.plane-img');
            if (imgEl) {
                imgEl.style.transform = `rotate(${angle}deg)`;
            }

            if(autoFollow) {
                // 부드러운 이동을 위해 easeTo 사용, duration 0으로 하여 실시간 추적
                map.easeTo({
                    center: currentPos,
                    duration: 0 
                });
            }

            const remainingDistance = calculateDistance(currentPos[1], currentPos[0], toLngLat[1], toLngLat[0]);
            distanceDisplay.textContent = `${remainingDistance.toFixed(0)} km`; 
            
            const distTraveled = Math.max(0, lastCalculatedDistance - remainingDistance);
            const gainable = distTraveled - lastMoneyGainDistance;
            if (gainable >= 20) {
                updateMoney(Math.floor(gainable / 20) * 5);
                lastMoneyGainDistance += Math.floor(gainable / 20) * 20; 
            }

            step++; 
            setTimeout(animate, 1000/fps);
        }
        animate();
    }

    function generateFlightNumber(){ return 'KE' + Math.floor(Math.random()*1000+100); }
    
    function isSeatAvailable(seatClass) {
        const rand = Math.random();
        if (seatClass === 'F') return rand > 0.3; 
        if (seatClass === 'B') return rand > 0.2; 
        return rand > 0.05; 
    }

    // UI 렌더링
    function renderDepartureSelect(filter = '') {
        const filterText = filter.toLowerCase();
        const currentSelected = departureSelect.value; 
        departureSelect.innerHTML = ''; 
        const placeholder = document.createElement('option');
        placeholder.value = ""; placeholder.textContent = "출발 도시 선택"; placeholder.disabled = true;
        departureSelect.appendChild(placeholder);
        Object.keys(airportData).forEach(city => {
            const airport = airportData[city];
            if (filterText === '' || `${city} ${airport.code}`.toLowerCase().includes(filterText)) {
                const opt = document.createElement('option');
                opt.value = city; opt.textContent = `${airport.code} - ${city}`; 
                departureSelect.appendChild(opt);
            }
        });
        departureSelect.value = currentSelected || "";
    }
    renderDepartureSelect();
    departureSearch.oninput = () => renderDepartureSelect(departureSearch.value);
    departureSelect.onchange=()=>{ 
      currentDeparture=departureSelect.value; selectedFlightInfo.style.display='none'; selectedArrival=null; 
      arrivalSearch.style.display = 'block'; arrivalSearch.value = ''; greetingContainer.style.display = 'none'; renderArrivalList(); 
    };

    function showTicketModal() {
        if (!currentDeparture || !selectedArrival) return; 
        seatAvailabilityMap = {}; selectedSeat = null; selectedFocusMode = null; 
        boardingPassContainer.style.display = 'none'; boardingPassContainer.classList.remove('show');
        seatSelectionContainer.style.display = 'block'; seatSelectionContainer.classList.remove('collapsed'); 
        document.getElementById('focusModeSelector').style.display = 'block'; 
        reselectSeatBtn.classList.add('hidden'); selectionButtons.style.display = 'flex'; 
        renderSeats(); renderFocusModeButtons(); updateSelectionDisplay(); 
        confirmSelectionBtn.disabled = true; arrivalList.style.display = 'none'; arrivalSearch.style.display = 'none'; ticketBtn.style.display='none'; 
        modal.style.display='flex'; 
    }
    function updateSelectionDisplay() {
        selectedSeatDisplay.textContent = selectedSeat || '좌석 없음';
        selectedFocusModeDisplay.textContent = selectedFocusMode || '모드 없음';
        confirmSelectionBtn.disabled = !(selectedSeat && selectedFocusMode);
    }
    reselectSeatBtn.onclick = () => { seatSelectionContainer.classList.remove('collapsed'); reselectSeatBtn.classList.add('hidden'); };

    function renderBoardingPass() {
        const dep = airportData[currentDeparture]; const arr = airportData[selectedArrival];
        const flightNum = generateFlightNumber(); const gateNum = 'A' + Math.floor(Math.random() * 10);
        const seatRow = parseInt(selectedSeat.slice(0, -1));
        let cls = (seatRow===1)?'FIRST':(seatRow<=4)?'BUSINESS':'ECONOMY';
        
        const totalDist = calculateDistance(dep.lat, dep.lon, arr.lat, arr.lon);
        initialFlightDistance = totalDist;

        bpRoute.textContent = `${dep.code} → ${arr.code}`;
        bpFlightNo.textContent = `FLT: ${flightNum}`; bpGate.textContent = `GATE: ${gateNum}`; bpClass.textContent = `CLASS: ${cls}`;
        bpSeat.textContent = selectedSeat; bpFocusMode.textContent = selectedFocusMode; 
        bpBarcodeText.textContent = `${flightNum}-${selectedSeat}-${userName||'DUKKI'}`; 
        
        pendingFlight = {
            from: currentDeparture, to: selectedArrival, seat: selectedSeat, focus: selectedFocusMode,
            flightNumber: flightNum, time: new Date().toLocaleString(), distance: totalDist, 
            duration: flightTimes[`${currentDeparture}-${selectedArrival}`] || (5*3600)
        };
        seatSelectionContainer.style.display = 'none'; document.getElementById('focusModeSelector').style.display = 'none'; 
        reselectSeatBtn.classList.add('hidden'); selectionButtons.style.display = 'none'; 
        boardingPassContainer.classList.remove('show'); boardingPassContainer.style.display = 'block';
        requestAnimationFrame(() => { requestAnimationFrame(() => { boardingPassContainer.classList.add('show'); }); });
        slideHandle.style.left = '2px'; slideBackground.style.width = '0px'; slideTrack.classList.remove('scanned'); slideText.textContent = '밀어서 티켓 스캔 🎫'; 
    }

    confirmSelectionBtn.onclick = () => {
        if (!selectedSeat || !selectedFocusMode) return;
        const seatRow = parseInt(selectedSeat.slice(0, -1));
        let cost = (seatRow===1)?300:(seatRow<=4)?100:0;
        if (currentMoney < cost) { showPopup(`잔액 부족! (${cost}원 필요)`, 3000); return; }
        if (cost > 0) { updateMoney(-cost); showPopup(`${cost}원 차감됨.`, 3000); }
        renderBoardingPass(); 
    };

    function renderArrivalList(filter = ''){
        arrivalList.innerHTML=''; 
        if (!currentDeparture) { arrivalList.style.display='none'; return; }
        arrivalList.style.display='block'; ticketBtn.style.display='none'; distanceDisplay.textContent = '0 km'; 
        Object.keys(airportData).forEach(city=>{
            if(city===currentDeparture) return;
            if (filter && !`${city} ${airportData[city].code}`.toLowerCase().includes(filter.toLowerCase())) return;
            
            const key=currentDeparture+'-'+city;
            const duration=formatTime(flightTimes[key] || (5*3600)).replace(/ /g, '').toLowerCase(); 
            const div=document.createElement('div');
            div.className='arrival-item';
            div.innerHTML=`<div>${airportData[city].code} - ${city}</div><div style="font-size:13px;color:var(--color-text-dim);">${airportData[city].name} - ${duration}</div>`;
            
            if (selectedArrival === city) div.classList.add('selected-arrival');
            else if (selectedArrival !== null) div.style.display='none';

            div.onclick=()=>{
                arrivalSearch.style.display = 'none';
                document.querySelectorAll('.arrival-item').forEach(i=>{i.style.display='none';i.classList.remove('selected-arrival');});
                div.classList.add('selected-arrival'); div.style.display='block'; 
                selectedArrival=city; ticketBtn.style.display='block'; ticketBtn.textContent='좌석 선택';
                
                // 🛑 [수정됨] 이벤트 초기화 후 클릭 이벤트 재할당
                ticketBtn.onmousedown = null;
                ticketBtn.onmouseup = null;
                ticketBtn.onmouseleave = null;
                ticketBtn.ontouchstart = null;
                ticketBtn.ontouchend = null;
                ticketBtn.onclick=showTicketModal; 
            };
            arrivalList.appendChild(div);
        });
    }
    arrivalSearch.oninput = () => renderArrivalList(arrivalSearch.value);

    function renderSeats(){ 
        const container = document.getElementById('seatMap'); container.innerHTML = '';
        for(let r=1; r<=40; r++){
            const rowDiv = document.createElement('div'); rowDiv.className = 'row';
            let sClass='E', cols=['A','B','C','','D','E','F','','G','H','I'];
            if(r===1){ sClass='F'; cols=['A','B','','D','E','','G','H']; rowDiv.dataset.class='F'; }
            else if(r<=4){ sClass='B'; rowDiv.dataset.class='B'; }
            else rowDiv.dataset.class='E';

            if(r===1) container.insertAdjacentHTML('beforeend', `<div class="section-facility"><span class="facility-item lav-left">🚽</span><span class="facility-item lav-right">🚽</span></div>`);
            if(r===2 || r===5 || r===20 || r===35) container.insertAdjacentHTML('beforeend', `<div class="section-separator"></div>`);
            if(r===5 || r===20 || r===35) container.insertAdjacentHTML('beforeend', `<div class="section-facility"><span class="facility-item exit-left">🚪 EXIT</span><span class="facility-item exit-right">🚪 EXIT</span></div>`);

            cols.forEach((col, idx)=>{
                if(col === ''){
                    const aisle = document.createElement('div'); aisle.className = 'aisle';
                    aisle.style.width = (sClass==='F' && (idx===2||idx===5)) ? '25px' : (idx===3||idx===7) ? '20px' : '15px';
                    rowDiv.appendChild(aisle);
                } else {
                    const seat = document.createElement('div'); seat.className = 'seat';
                    const sid = `${r}${col}`; seat.dataset.seat = sid; seat.dataset.class = sClass; seat.textContent = sid;
                    
                    let avail = seatAvailabilityMap[sid];
                    if (avail === undefined) { avail = isSeatAvailable(sClass); seatAvailabilityMap[sid] = avail; }
                    if (r===40 && ['D','E','F'].includes(col)) avail=false; 

                    if (!avail) seat.classList.add('unavailable');
                    if (selectedSeat === sid) seat.classList.add('selected');
                    
                    seat.onclick = ()=>{
                        if (!avail) { showPopup("예약된 좌석입니다.", 2000); return; }
                        document.querySelectorAll('.seat').forEach(s=>s.classList.remove('selected'));
                        seat.classList.add('selected'); 
                        selectedSeat = sid;
                        updateSelectionDisplay(); 
                        seatSelectionContainer.classList.add('collapsed'); 
                        reselectSeatBtn.classList.remove('hidden'); 
                    };
                    rowDiv.appendChild(seat);
                }
            });
            container.appendChild(rowDiv);
            if(r===40) container.insertAdjacentHTML('beforeend', `<div class="section-facility"><span class="facility-item" style="color:red;">🚪 EXIT</span><span>🚽</span><span>🚽</span><span class="facility-item" style="color:red;">🚪 EXIT</span></div>`);
        }
    }

    function renderFocusModeButtons(){ 
        focusModeButtonsContainer.innerHTML = '';
        [{m:'STUDY',e:'📚',c:'#0077ff'},{m:'BOOK',e:'📖',c:'#28a745'},{m:'MUSIC',e:'🎧',c:'#ffc107'},{m:'REST',e:'💤',c:'#dc3545'}].forEach(i => {
            const btn = document.createElement('button'); btn.className = 'focus-button';
            btn.innerHTML = `${i.e} ${i.m}`; btn.style.backgroundColor = i.c;
            if (selectedFocusMode === i.m) btn.classList.add('selected');
            btn.onclick = () => {
                document.querySelectorAll('.focus-button').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected'); selectedFocusMode = i.m; updateSelectionDisplay(); 
            };
            focusModeButtonsContainer.appendChild(btn);
        });
    }

    let isDragging = false, startOffset = 0;
    slideTrack.addEventListener('mousedown', startDrag); slideTrack.addEventListener('touchstart', startDrag);
    function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
    function startDrag(e) {
        if (slideTrack.classList.contains('scanned')) return;
        isDragging = true; slideTrack.classList.add('sliding');
        startOffset = getX(e) - slideHandle.getBoundingClientRect().left + slideTrack.getBoundingClientRect().left; 
        startOffset = 20; 
        document.addEventListener('mousemove', drag); document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag); document.addEventListener('touchend', endDrag);
        e.preventDefault(); 
    }
    function drag(e) {
        if (!isDragging) return;
        const x = getX(e); const rect = slideTrack.getBoundingClientRect();
        let val = x - rect.left - startOffset + 20;
        val = Math.max(2, Math.min(rect.width - 42, val));
        slideHandle.style.left = val + 'px'; slideBackground.style.width = (val+20) + 'px';
        e.preventDefault(); 
    }
    function endDrag(e) {
        if (!isDragging) return; isDragging = false; slideTrack.classList.remove('sliding');
        document.removeEventListener('mousemove', drag); document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag); document.removeEventListener('touchend', endDrag);
        const cur = parseFloat(slideHandle.style.left); const max = slideTrack.getBoundingClientRect().width - 42;
        if (cur / max > 0.9) {
            slideTrack.classList.add('scanned'); slideHandle.style.left = max+'px'; slideBackground.style.width = '100%';
            slideText.textContent = '스캔 완료 ✅'; startFlight();
        } else {
            slideHandle.style.left = '2px'; slideBackground.style.width = '0px';
        }
    }

    function startFlight() {
        if(!pendingFlight){ alert('오류: 비행 정보 없음'); return; }
        showPopup("티켓 스캔 완료! 비행을 시작합니다 🛫", 3000);
        try { backgroundMusic.currentTime = 0; backgroundMusic.play(); } catch(e){}

        const dep = airportData[pendingFlight.from];
        const arr = airportData[pendingFlight.to];
        
        selectedArrival = pendingFlight.to; updateClocks();
        modal.style.display='none';
        
        timerContainer.classList.add('is-flight-active');
        timerDisplayPreFlight.style.display = 'none';
        ['.timer-box-time','.timer-box-clock','.timer-box-distance'].forEach(s=>document.querySelector(s).style.display='block');
        focusStatus.style.display = 'block'; focusStatus.textContent = pendingFlight.focus;

        toggleFollowBtn.style.display = 'flex'; moneyButton.classList.add('in-flight');

        if(departureAirportMarker) departureAirportMarker.remove();
        if(arrivalAirportMarker) arrivalAirportMarker.remove();
        
        departureAirportMarker = new mapboxgl.Marker({ element: createAirportIconElement(dep.code, true) })
            .setLngLat([dep.lon, dep.lat]).addTo(map);
        arrivalAirportMarker = new mapboxgl.Marker({ element: createAirportIconElement(arr.code, false) })
            .setLngLat([arr.lon, arr.lat]).addTo(map);

        autoFollow = true; followIcon.textContent = '📍';
        isFlying = true; // 🚀 비행 시작 플래그 활성화

        ticketBtn.textContent='비행 중지 (5초 꾹)'; ticketBtn.classList.add('disabled-during-flight');
        [departureSelect, arrivalList, arrivalSearch, departureSearch, greetingContainer].forEach(e=>e.style.display='none');
        controlsContainer.classList.add('controls-disabled');

        selectedFlightInfo.innerHTML = `
            <div style="font-size: 20px; font-weight: 900; color: var(--color-primary); margin-bottom: 8px;">${dep.code} → ${arr.code}</div>
            <div class="flight-subtitle" style="margin-bottom: 4px;">좌석 | ${pendingFlight.seat}</div>
            <div style="font-size: 14px; color: var(--color-text-light);">도착 | ${arr.name}</div>`;
        selectedFlightInfo.style.display = 'flex'; ticketBtn.style.display='block';

        ticketBtn.onclick = null;
        ticketBtn.onmousedown = handleStopFlightStart; ticketBtn.onmouseup = handleStopFlightEnd; ticketBtn.onmouseleave = handleStopFlightEnd;
        ticketBtn.ontouchstart = handleStopFlightStart; ticketBtn.ontouchend = handleStopFlightEnd;

        distanceDisplay.textContent = `${pendingFlight.distance.toFixed(0)} km`;
        startTimer(pendingFlight.duration, pendingFlight.focus);
        
        moveMarkerWithTimer([dep.lon, dep.lat], [arr.lon, arr.lat], pendingFlight.duration, ()=>{
            stopFlight(true);
        });
    }

    function handleStopFlightStart(e) { e.preventDefault(); if (pressTimer) return; const start = Date.now(); ticketBtn.style.transition = 'background-image 0.05s linear'; pressTimer = setInterval(() => { const p = (Date.now()-start)/PRESS_DURATION*100; ticketBtn.style.backgroundImage = `linear-gradient(to right, var(--color-accent-red) ${p}%, var(--color-primary) ${p}%)`; if(p>=100) { handleStopFlightEnd(); alert("비행 강제 중지 🛑"); saveFlightRecord(); stopFlight(false); } }, 50); }
    function handleStopFlightEnd() { if (pressTimer) { clearInterval(pressTimer); pressTimer = null; } ticketBtn.style.backgroundImage = ''; }

    function stopFlight(completed) {
        handleStopFlightEnd(); clearInterval(timerInterval);
        try { backgroundMusic.pause(); } catch(e){}
        toggleFollowBtn.style.display = 'none'; moneyButton.classList.remove('in-flight');
        seatAvailabilityMap = {};
        
        isFlying = false; // 🚀 비행 종료 플래그 (애니메이션 루프 멈춤)

        if(flightMarker) flightMarker.remove(); 
        if(departureAirportMarker) departureAirportMarker.remove(); 
        if(arrivalAirportMarker) arrivalAirportMarker.remove();
        if(map.getSource('route')) { map.removeLayer('route'); map.removeSource('route'); }

        timerSeconds=0; selectedArrival=null; autoFollow=true;
        
        map.flyTo({ center: [127, 37], zoom: 1.5, pitch: 0 });

        controlsContainer.classList.remove('controls-disabled'); ticketBtn.classList.remove('disabled-during-flight');
        
        // 🛑 [수정됨] 버튼 이벤트 리스너 확실한 초기화 (꾹 누르기 기능 제거)
        ticketBtn.onmousedown = null;
        ticketBtn.onmouseup = null;
        ticketBtn.onmouseleave = null;
        ticketBtn.ontouchstart = null;
        ticketBtn.ontouchend = null;
        ticketBtn.onclick = null;
        ticketBtn.style.backgroundImage = '';

        selectedFlightInfo.style.display='none'; departureSelect.style.display = 'block'; departureSearch.style.display = 'block';
        if (!completed) { departureSelect.value=''; currentDeparture=null; renderDepartureSelect(); }
        if (userName) updateGreeting(userName);

        arrivalList.style.display='none'; arrivalSearch.style.display='none'; ticketBtn.style.display='none'; pendingFlight=null;
        hideAllContainers(); document.getElementById('map').style.display='block'; bottomNavUpdateActive('homeBtn'); initializeTimerUI();
    }

    function saveFlightRecord(){ 
        if(!pendingFlight) return;
        const dur = pendingFlight.duration, focus = dur - timerSeconds;
        pendingFlight.completionTime = new Date().toLocaleString();
        pendingFlight.focusDuration = focus; 
        pendingFlight.focusPercentage = ((focus/dur)*100).toFixed(1);
        let rec=JSON.parse(localStorage.getItem('focusFlightRecords')||'[]');
        rec.push(pendingFlight); localStorage.setItem('focusFlightRecords',JSON.stringify(rec));
    }

    // 기록 UI
    function renderRecords(filter='all'){ 
        currentRecordFilter=filter; const con=document.getElementById('records'); con.innerHTML='';
        let rec=JSON.parse(localStorage.getItem('focusFlightRecords')||'[]');
        rec = rec.filter(r => filter==='all' ? true : filter==='completed' ? r.focusDuration>=r.duration : r.focusDuration<r.duration);
        document.querySelectorAll('.record-filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===filter));
        if(!rec.length) { con.innerHTML='<p style="text-align:center;margin-top:20px;color:#888;">기록이 없습니다.</p>'; return; }
        rec.reverse().forEach(r=>{
            const dist = ((r.distance||0)*(r.focusDuration/r.duration)).toFixed(0);
            const status = r.focusDuration>=r.duration ? '<span style="color:#28a745">완료</span>' : '<span style="color:red">중단</span>';
            con.innerHTML += `<div class="ticket-item"><div class="ticket-main"><div class="ticket-header">${airportData[r.from].code} → ${airportData[r.to].code}</div><div>${formatTime(r.focusDuration).split(' ')[0]}</div></div><div class="ticket-info-panel"><div>DATE: ${r.time}</div><div>STATUS: ${status}</div><div>DIST: ${dist} km</div></div></div>`;
        });
    }

    function renderTrends() {
        const rec = JSON.parse(localStorage.getItem('focusFlightRecords') || '[]');
        if (rec.length === 0) {
            trendsData.innerHTML = '<p style="text-align:center; color:#888; grid-column: 1 / -1;">데이터가 없습니다.</p>';
            return;
        }

        let totalDist = 0, totalFocus = 0, completedCount = 0;
        rec.forEach(r => {
            if (r.focusDuration >= r.duration) completedCount++;
            totalDist += r.distance * (r.focusDuration / r.duration);
            totalFocus += r.focusDuration;
        });

        const rate = ((completedCount / rec.length) * 100).toFixed(1);
        const focusH = (totalFocus / 3600).toFixed(1);
        const distKm = totalDist.toFixed(0);

        trendsData.innerHTML = `
            <div class="trend-item">
                <div class="trend-label">총 비행 횟수</div>
                <div class="trend-value">${rec.length}</div>
            </div>
            <div class="trend-item">
                <div class="trend-label">완주율</div>
                <div class="trend-value">${rate}%</div>
            </div>
            <div class="trend-item" style="grid-column: 1 / -1;">
                <div class="trend-label">총 누적 거리</div>
                <div class="trend-value">${distKm} km</div>
                <div style="font-size:12px; color:#888; margin-top:5px;">지구 약 ${(totalDist/40075).toFixed(2)}바퀴</div>
            </div>
            <div class="trend-item" style="grid-column: 1 / -1;">
                <div class="trend-label">총 집중 시간</div>
                <div class="trend-value">${focusH} 시간</div>
            </div>
        `;
    }

    // 하단 네비게이션 및 모달 핸들러
    function hideAllContainers() { ['recordsContainer','trendsContainer','settingsModal','shopContainer'].forEach(id=>document.getElementById(id).style.display='none'); if(!pendingFlight && userName) updateGreeting(userName); }
    function bottomNavUpdateActive(id) { bottomNavButtons.forEach(b => b.classList.toggle('active', b.id === id)); }
    
    document.getElementById('homeBtn').onclick=()=>{ if(pendingFlight)return; hideAllContainers(); bottomNavUpdateActive('homeBtn'); };
    document.getElementById('recordBtn').onclick=()=>{ if(pendingFlight)return; hideAllContainers(); renderRecords(); document.getElementById('recordsContainer').style.display='block'; bottomNavUpdateActive('recordBtn'); };
    
    document.getElementById('trendsBtn').onclick=()=>{ 
        if(pendingFlight)return; 
        hideAllContainers(); 
        renderTrends(); 
        document.getElementById('trendsContainer').style.display='block'; 
        bottomNavUpdateActive('trendsBtn'); 
    };

    document.getElementById('shopBtn').onclick=()=>{ if(pendingFlight)return; hideAllContainers(); document.getElementById('shopContainer').style.display='block'; bottomNavUpdateActive('shopBtn'); };
    document.getElementById('settingsBtn').onclick=()=>{ if(pendingFlight)return; hideAllContainers(); document.getElementById('settingsModal').style.display='flex'; bottomNavUpdateActive('settingsBtn'); };
    document.querySelectorAll('.close-container-btn').forEach(b=>b.onclick=()=>{ hideAllContainers(); bottomNavUpdateActive('homeBtn'); });
    document.getElementById('closeModalBtn').onclick=()=>{ modal.style.display='none'; arrivalSearch.style.display='block'; renderArrivalList(arrivalSearch.value); };

    // 기록 필터 버튼 클릭 이벤트 복구
    document.querySelectorAll('.record-filter-btn').forEach(btn => {
        btn.onclick = (e) => {
            const filter = e.target.dataset.filter;
            renderRecords(filter);
        };
    });

    // 설정 닫기 버튼 클릭 이벤트 복구
    document.getElementById('closeSettingsModalBtn').onclick = () => {
         document.getElementById('settingsModal').style.display = 'none';
         bottomNavUpdateActive('homeBtn');
    };

    // 설정: 지도 스타일 버튼
    document.querySelectorAll('.map-style-button').forEach(btn => {
        btn.onclick = (e) => switchMapStyle(e.target.dataset.style);
    });

    loadUserName(); updateClocks(); initializeMoneyUI();
});