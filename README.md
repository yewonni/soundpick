# soundpick

### 🌐 배포 URL

[soundpick 바로가기](https://soundpick.kro.kr/)

**⚠️ 현재 서버 만료로 실제 서비스는 확인할 수 없습니다.  
   각 화면 동작은 아래 GIF에서 확인 가능합니다.**

-------------------




## 🎧 프로젝트 소개

soundpick은 사용자의 음악 취향을 분석해 곡, 플레이리스트, 아티스트를 추천하는 음악 추천 웹서비스입니다.  
이 프로젝트는 더 많은 사용자가 자신의 취향을 발견하고 확장해나갈 수 있도록 돕는 것을 목표로 합니다.  
커뮤니티 기능과 마이페이지 관리 기능을 통해 사용자 간의 소통과 개인화된 음악 경험을 제공합니다.  
모바일 사용자 경험에 중점을 두고 설계되었으며, 모든 기기에서 자연스럽게 이용할 수 있도록 반응형 UI로 구현되었습니다.  

**[테스트 계정]**

  - **ID**: mango
  - **PW**: mango123!


## 💡 개발 환경

### Frontend

- **프레임워크/라이브러리**: React
- **스타일링**: Tailwind CSS
- **라우팅**: React Router
- **상태 관리**: Context API, Redux 
- **버전 관리**: Git & GitHub
- **API 통신**: Axios
- **배포 환경**: AWS 

### Backend

- **백엔드**: spotify 제공 API / 자체 서버 활용

  

## 🗂️ 프로젝트 폴더 구조
<details>
<summary> 구조 펼치기 </summary>

📦 src  
 ┣ 📂api  
 ┃ ┣ 📂analysis          
 ┃ ┣ 📂join              
 ┃ ┣ 📂login       
 ┃ ┣ 📂main               
 ┃ ┣ 📂myPage            
 ┃ ┣ 📂playlistDetails  
 ┃ ┣ 📂profile           
 ┃ ┣ 📂search            
 ┃ ┗ 📜axiosInstance.ts  

 ┣ 📂components       
 ┣ 📂constants           
 ┣ 📂context             
 ┣ 📂hooks              
 ┣ 📂images              

 ┣ 📂pages         
 ┃ ┣ 📂musicAnalysis    
 ┃ ┣ 📂404error          
 ┃ ┣ 📂editProfile  
 ┃ ┣ 📂join             
 ┃ ┣ 📂login             
 ┃ ┣ 📂myPage           
 ┃ ┣ 📂playlistDetails   
 ┃ ┣ 📂popularArtists      
 ┃ ┣ 📂popularPlaylists   
 ┃ ┣ 📂recommendedTrack   
 ┃ ┣ 📂recommendedPlaylist   
 ┃ ┣ 📂search / searchResult   
 ┗ ┗ 📂... 기타 페이지  

 ┣ 📂store               // Redux 스토어 및 슬라이스  
 ┣ 📂types               // 타입 정의 파일  
 ┣ 📂utils               // 유틸 함수 및 유효성 검사  

 ┣ 📜App.tsx / Home.tsx  
 ┣ 📜index.tsx / index.css  
 ┗ 📜App.css / declarations.d.ts  
</details>


## 🌟 페이지별 기능
  
### [회원가입]

 - 입력한 값에 대해 실시간 유효성 검사가 실행됩니다.
 - 아이디와 닉네임 중복 검사를 통해 고유성을 확인합니다.
 - 필수 입력 항목을 모두 충족하고, 이용약관 동의를 완료하면 회원가입이 가능합니다.

<img src="https://github.com/user-attachments/assets/8a58ef04-5cf6-4bbb-a4d8-38cd0282e123" width="600" height="auto"> 



### [로그인]

 - 로그인 버튼 클릭 시, 입력한 아이디와 비밀번호에 대해 유효성 검사가 실행됩니다.
 - 아이디 저장 기능을 통해 다음 방문 시 아이디를 자동으로 불러올 수 있습니다.
 - 로그인 성공 시 홈으로 이동하며, 실패 시 에러 메시지가 표시됩니다.

<img src="https://github.com/user-attachments/assets/27ece84b-1e0a-4791-b748-730d4af01aa3" width="600" height="auto">
   

### [홈 페이지]

 - **비로그인 상태이거나, 취향 분석을 진행하지 않은 사용자에게는**  
   스포티파이 기준의 인기 아티스트 및 추천 플레이리스트 목록을 제공합니다.
    
 - **로그인 후 취향 분석을 완료한 사용자에게는**  
   사용자 맞춤 곡 목록 및 맞춤 플레이리스트를 보여줍니다.

 - 최초 회원가입 후 첫 로그인 시, 홈 화면 진입 시 취향 분석을 유도하는 모달이 표시됩니다.  
   
 - 사용자 상태에 따라 행동을 유도하는 배너를 표시합니다.  
    - **비로그인 사용자** : 로그인 안내  
    - **로그인했지만 취향 분석을 하지 않은 사용자** : 취향 분석 시작 유도  
    - **취향 분석 완료 사용자** : 추천 곡 확인 유도
  
<img src="https://github.com/user-attachments/assets/e3cee6f5-ea43-4d69-a0ea-f41886a421d2" width="600" height="auto">

<img src="https://github.com/user-attachments/assets/36947b56-d1c8-41fb-ab8f-d5475bc82cf4" width="600" height="auto">

<img src="https://github.com/user-attachments/assets/6f85a8df-5f01-4cfb-9bc8-c53eeec27392" width="600" height="auto">
 
      
### [검색 페이지]
 
 - 로그인한 사용자는 곡 제목 또는 플레이리스트 이름으로 콘텐츠를 검색할 수 있습니다.
 - 검색 결과는 곡과 플레이리스트로 구분하여 표시됩니다.
 - 곡 검색 결과에서 사용자는 원하는 곡을 선택해, 본인이 생성한 플레이리스트에 추가할 수 있습니다.
 - 곡을 클릭하면 해당 곡의 유투브 검색 결과 페이지로 이동합니다

<img src="https://github.com/user-attachments/assets/592a6dd1-1532-4804-8af7-3772f16c90e8" width="600" height="auto">

<img src="https://github.com/user-attachments/assets/822e2bdf-7ed1-4321-abbe-881241a5ae76" width="600" height="auto">
   
    
### [취향분석 시작 페이지]

 - 사용자는 선호하는 장르와 아티스트를 선택할 수 있습니다.
 - 원하는 아티스트가 기본 선택 옵션에 없을 경우, 아티스트 검색 페이지를 통해 직접 추가할 수 있습니다.
 - 분석 도중 홈으로 이동할 시 선택한 정보가 사라진다는 경고 모달이 표시됩니다.
 - 모든 선택 완료 후 다음으로 넘어가면, 선택한 정보를 기반으로 취향 분석이 자동으로 진행됩니다.

<img src="https://github.com/user-attachments/assets/7b57a238-6527-4c75-b455-9c2a3477f6c4" width="600" height="auto">
   

### [취향분석 결과 페이지]

 - 사용자의 선택을 바탕으로 추천 트랙과 아티스트 목록이 표시됩니다.
 - 사용자는 추천 결과에서 항목을 제거하거나, 검색 페이지를 통해 직접 추가하여 수정할 수 있습니다.
 - 별도로 수정하지 않으면 추천 결과가 그대로 반영됩니다.
 - 수정 완료 후 홈으로 이동하면, 반영된 결과를 기반으로 맞춤 콘텐츠가 제공됩니다.


<img src="https://github.com/user-attachments/assets/71745cf6-2d3e-4182-b30f-df48a47e8b4f" width="600" height="auto">


### [플레이리스트 상세 페이지]

 - 플레이리스트 정보와 포함된 트랙 목록이 표시됩니다.
 - 사용자는 좋아요 기능을 통해 플레이리스트를 마이페이지의 ‘내가 좋아한 플레이리스트’에 저장할 수 있습니다.
 - 댓글 아이콘 클릭 시, 해당 플레이리스트에 대한 리뷰 작성 페이지로 이동합니다.
 - 곡을 클릭하면 해당 곡의 유투브 검색 결과 페이지로 이동합니다.

 <img src="https://github.com/user-attachments/assets/391ab8ba-5a8b-43ae-926e-02135a1a3c7b" width="600" height="auto">
   

### [리뷰 페이지]

 - 사용자는 선택한 플레이리스트에 대해 별점과 리뷰를 작성할 수 있습니다.
 - 작성한 리뷰는 수정 및 삭제가 가능하며, 마이페이지의 ‘내가 남긴 한마디’에서 관리할 수 있습니다.

<img src="https://github.com/user-attachments/assets/e747fbe5-2dec-4e87-8857-a6623182e168" width="600" height="auto">
   

### [마이페이지]

  #### 1. 프로필 수정
   - 닉네임, 프로필 사진, 소개글을 수정할 수 있습니다.
   - 수정된 프로필은 마이페이지 상단에 표시됩니다.

<img src="https://github.com/user-attachments/assets/c8870b0c-ef8a-41b8-a91c-8fc7b035a233" width="600" height="auto">

  #### 2. My All-Time Hits!
   - 사용자가 가장 사랑하는 곡을 자유롭게 추가 및 삭제하여 보여줄 수 있는 공간입니다.

<img src="https://github.com/user-attachments/assets/32687c96-1385-4fb5-bc50-3acbe9aa6b98" width="600" height="auto">
     

  #### 3. 나의 플레이리스트
   - 사용자는 본인만의 플레이리스트를 생성할 수 있습니다.
   - 검색 페이지에서 추가한 곡은 나의 플레이리스트 상세 페이지에서 삭제할 수 있습니다.
   - 본인의 플레이리스트 자체를 삭제할 수 있습니다.

  <img src="https://github.com/user-attachments/assets/75539fb4-dbec-4bdf-b6e3-29af2e397da8" width="600" height="auto">

  #### 4. 내가 좋아한 플레이리스트
   - 다른 사용자의 플레이리스트에 좋아요를 누르면 이 목록에 저장됩니다.
   - 좋아요를 해제하면 해당 플레이리스트는 목록에서 자동으로 제거됩니다.

<img src="https://github.com/user-attachments/assets/8cbe6641-4f04-45fc-a9ae-11b20eab14ac" width="600" height="auto">
     

  #### 5. 나의 활동
   - 음악 취향 분석, 내가 남긴 한마디, 나의 음악 친구 탭으로 구성됩니다.
     
      - **음악 취향 분석** : 언제든지 다시 분석을 진행할 수 있습니다.
      - **내가 남긴 한마디** : 작성한 리뷰 목록을 확인하거나 삭제할 수 있습니다.
      - **나의 음악 친구** : 내가 팔로우한 친구 목록을 확인하고, 검색을 통해 팔로우/언팔로우 할 수 있습니다.
    
<img src="https://github.com/user-attachments/assets/87fb6529-73b6-47a6-8593-7da487fb8d13" width="600" height="auto">
        

### [404 에러 페이지]
   - 404 에러일 때 나타나는 페이지로, 홈으로 이동하기 기능을 제공합니다.

<img src="https://github.com/user-attachments/assets/93cb7613-3c14-4ea2-a4a0-76e18cee6643" width="600" height="auto">



## 💥 트러블슈팅
## 웹 초기화 전 API 호출 문제 대응

### 문제

웹이 시작될 때 로그인 여부, accessToken, 초기 상태 등을 세팅하기 전에  
axios 요청이 먼저 발생하면서, Authorization 헤더 없이 인증이 필요한 API를 호출하게 되어  
401 에러가 발생하는 문제가 있었습니다.

이는 컴포넌트 마운트보다 axios 요청이 먼저 트리거되는 경우 자주 발생할 수 있습니다.

---

### 원인

- 초기 렌더링 시, 아직 전역 상태가 완전히 초기화되지 않은 시점에 axios 요청이 발생함
- 이로 인해 getAccessToken()이 null을 반환하고, 인증이 필요한 API에서 인증 실패
- 서버는 매번 401 또는 403을 반환하며, 리프레시 로직으로도 해결되지 않음

---

### 해결 방법

axios 요청 인터셉터 내부에서 다음과 같은 대기 로직을 적용하였습니다.

1. getIsInitializing(), getHasInitialized() 상태를 외부에서 주입받아 초기화 상태 확인
2. 초기화 중이면 요청을 즉시 보내지 않고, setTimeout 루프로 대기
3. 초기화가 완료되면 요청을 재시도

```ts
if (isInitializing || !hasInitialized) {
  if (setLoadingGlobal) {
    setLoadingGlobal(false);
  }

  return new Promise((resolve) => {
    const checkAndRetry = () => {
      const currentIsInitializing = getIsInitializing?.();
      const currentHasInitialized = getHasInitialized?.();

      if ((!currentIsInitializing && currentHasInitialized) || isLoggedIn) {
        resolve(config); // 초기화 완료 후 요청 재시도
      } else {
        setTimeout(checkAndRetry, 100); // 100ms 간격으로 재확인
      }
    };

    setTimeout(checkAndRetry, 100);
  });
}





     



   




   





