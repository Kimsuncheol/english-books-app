import { Book } from './types';

export const books: Book[] = [
  {
    id: 1,
    title: "Mystery Call",
    author: "Unknown",
    path: "/books/1",
    image: "/mystery-call.png",
    pages: [
      {
        id: 1,
        english: [
          "Telephone Vocabulary",
          "Pick up the phone : 전화를 받다.",
          "Get on the phone : 전화 통화를 시작하다 / 전화하다 / 전화받다.",
          "Call back : 다시 전화하다.",
          "Call ~ back : 부재 시 전화했던 ~에게 전화해 주다.",
          "Hang up : 전화를 끊다.",
          "Put A through (to B) : A를 (B에게) 전화로 연결해 주다.",
          "Break up : Experience signal issues. 통화가 끊겨서 잘 안들리다.",
          "Give ~ a ring/call : ~에게 전화해 주다., ~에게 전화하다."
        ],
        korean: null,
      },
      {
        id: 2,
        english: `The night was quiet, except for the occasional sound of cars passing by. Emily sat in her dimly lit apartment, staring at her phone. She had been waiting for a call all day.
Suddenly, her phone rang. Startled, she picked up the phone. "Hello?" she said hesitantly.

"Emily? It's Jake. I need to talk to you," the voice on the other end said urgently.`,
        
        korean: `밤은 조용했다. 가끔 지나가는 차 소리만 들릴 뿐이었다. 에밀리는 어두운 방 안에서 핸드폰을 바라보며 하루 종일 기다렸다.
갑자기 전화벨이 울렸다. 깜짝 놀란 그녀는 전화를 받았다. "여보세요?" 그녀가 망설이며 말했다.

"에밀리? 나 제이크야. 너와 이야기해야 해." 전화기 너머에서 다급한 목소리가 들려왔다.`,
      },
      {
        id: 3,
        english: `"Jake? What's going on?" Emily asked, confused.

"I can't explain everything over the phone. Can you get on the phone with me later? I’ll call you back in an hour," Jake said, his voice sounding distant.

"Okay… but is everything alright?" Emily pressed.

"I’ll explain soon. Just stay by your phone," Jake said before hanging up.`,
        
        korean: `"제이크? 무슨 일이야?" 에밀리가 혼란스러운 듯 물었다.

"전화로는 다 설명할 수 없어. 나중에 다시 통화할 수 있어? 한 시간 후에 다시 전화할게." 제이크의 목소리는 멀게 느껴졌다.

"알겠어... 하지만 무슨 일 있는 거야?" 에밀리는 다그쳤다.

"곧 설명할게. 그냥 전화기 옆에 있어." 제이크는 그렇게 말한 뒤 전화를 끊었다.`,
      },
      {
        id: 4,
        english: `Emily sat there, her heart pounding. 
        She had no idea what was going on. She stared at her phone, waiting for it to ring again.
        Finally, an hour passed. Just as she was about to give up, her phone rang. She picked up the phone instantly.
        
        "Jake? What’s going on?"`,
        korean: `에밀리는 심장이 두근거리는 것을 느끼며 자리에 앉아 있었다. 
        
        도대체 무슨 일인지 알 수 없었다. 그녀는 핸드폰을 응시하며 다시 전화가 오길 기다렸다.
        
        드디어 한 시간이 지났다. 그녀가 포기하려던 순간, 전화벨이 울렸다. 그녀는 재빨리 전화를 받았다.
        
        "제이크? 도대체 무슨 일이야?"`,
      },
      {
        id: 5,
        english: `"Emily, I think someone is following me. My calls keep breaking up, and I can't hear properly. I need you to put me through to someone who can help."
        Emily's heart raced. 

        "Who do you need to talk to?"
        
        "Detective Carter. Can you call him and put me through?"`,
        korean: `"에밀리, 누군가 나를 따라오는 것 같아. 통화가 자꾸 끊기고 제대로 들리지 않아. 나를 도와줄 수 있는 사람한테 전화 연결해 줄 수 있어?"
        
        에밀리의 심장이 요동쳤다. 
        
        "누구한테 연결해야 해?"
        
        "카터 형사야. 그에게 전화해서 나를 연결해 줄 수 있어?"`,
      },
      {
        id: 6,
        english: `Without hesitation, Emily dialed Detective Carter’s number. 
        
        "Detective Carter, it's Emily. Jake needs help. Can I put him through to you?"
        
        "Yes, of course! Put him through now" 
        
        The detective responded. Emily quickly switched the call, putting Jake through. 
        
        "Jake, talk to him now."`,
        korean: `"망설임 없이 에밀리는 카터 형사의 번호를 눌렀다. 
        
        "카터 형사님, 저 에밀리예요. 제이크가 도움이 필요해요. 그를 연결해도 될까요?"
        
        "네, 물론입니다! 지금 바로 연결하세요"
        
        형사가 답했다. 에밀리는 재빨리 전화를 돌려 제이크를 연결했다. 
        
        "제이크, 지금 형사님께 말해!"`,
      },
    ],
  },
  {
    id: 2,
    title: "Phone call story",
    author: "Unknown",
    path: "/books/2",
    image: "/phone-call-story.png",
    pages: [
      {
        id: 1,
        english: [
          "Shopping Vocabulary",
          "Mark down (the price) : 물건값을 깎다/값을 내리다.",
          "Bring down (the price) : 물건값을 깎다/값을 내리다.",
          "Put up (the price) : 값을 올리다.",
          "Jack up (the price) : 값을 급격히 올리다.",
          "Try on ~ / Try ~ on : (신발, 옷, 모자 등이 맞는지) 입어 보다/신어 보다/써 보다",
          "Look for ~ : ~을 찾다.",
          "Go (well) with : ~와 (잘) 어울리다.",
          "Pick out ~ / Pick ~ out : ~을 선택하다/뽑아내다.",
          "Queue up : 줄을 서다.",
          "Try out ~ / Try ~ out : 잘 되는지 시험 삼아 해 보다.",
          "Ring up ~ / Ring ~ up : (상점에서) 상품 가격을 입력해 고객이 물건값을 내도록 돕다/계산해 주다."
        ],
        korean: null,
      },
      {
        id : 2,
        english: `The grand sale was happening at Greenfield Mall, and customers had already started to queue up in front of the doors. Olivia had one goal in mind—to look for the perfect dress for her cousin's wedding. As soon as the doors opened, she rushed in, scanning the racks for something elegant. She picked out a few options and hurried to the fitting room to try them on.`,
        korean: `그린필드 몰에서 대규모 세일이 열리고 있었고, 고객들은 이미 문 앞에 줄을 서 있었다. 올리비아는 한 가지 목표가 있었다—사촌의 결혼식에서 입을 완벽한 드레스를 찾는 것이었다. 문이 열리자마자 그녀는 서둘러 들어가 우아한 옷을 찾으며 매대를 훑었다. 몇 가지를 골라 피팅룸으로 향했다.`,
      },
      {
        id : 3,
        english: `After trying on several dresses, she finally found one that went well with her heels. The only problem was the price—it was way too high. She wondered if they could mark down the price. She approached a salesperson. 
        
        "Is there any chance you could bring down the price on this dress?" she asked politely.

"We actually have a discount on this one today. Let me ring it up for you and see how much you save," the salesperson replied.`,
        korean: `여러 드레스를 입어 본 후 마침내 그녀의 구두와 잘 어울리는 것을 찾았다. 유일한 문제는 가격이었다—너무 비쌌다. 그녀는 가격을 깎을 수 있는지 궁금했다.

판매원에게 다가가 공손하게 물었다. 
"혹시 이 드레스 가격을 조금 낮춰 주실 수 있나요?"

"오늘 이 제품은 할인 중이에요. 계산해 보고 얼마나 절약할 수 있는지 확인해 드릴게요," 판매원이 대답했다.`,
      },
      {
        id : 4,
        english: `As the salesperson rang up the dress, Olivia noticed a sign that read, "Prices will go up tomorrow!" She felt relieved that she was making her purchase at the right time.

However, in another corner of the store, she heard a woman complaining.

"Why did you jack up the price of this handbag overnight? I was here yesterday, and it was much cheaper!"`,
        korean: `판매원이 드레스를 계산하는 동안 올리비아는 "내일부터 가격이 올라갑니다!"라는 표지판을 발견했다. 그녀는 적절한 타이밍에 구매하고 있다는 사실에 안도했다.

하지만 가게의 다른 쪽에서는 한 여성이 불평하는 소리가 들렸다. 

"이 핸드백 가격을 왜 갑자기 올렸어요? 어제 왔을 때 훨씬 저렴했는데!"`,
      },
      {
        id : 5,
        english: `Satisfied with her dress, Olivia decided to try out a pair of earrings. She picked out a simple yet elegant pair and held them up to the mirror. "These go well with my dress!" she thought, excited. Before heading to the register, she overheard a conversation between two employees.

"Should we put up the price of the new arrivals next week?"
"Not yet. Let’s wait and see how today’s sales go."`,
        korean: `드레스에 만족한 올리비아는 귀걸이도 시험 삼아 착용해 보기로 했다. 단순하면서도 우아한 디자인을 골라 거울 앞에서 들어 보았다. "이거 내 드레스랑 정말 잘 어울린다!" 그녀는 들뜬 마음으로 생각했다. 계산대로 가기 전, 그녀는 두 직원이 대화하는 것을 엿들었다.

"다음 주 신상품 가격을 올릴까요?"
"아직은요. 오늘 매출이 어떻게 나오는지 보고 결정하죠."`,
      },
      {
        id : 6,
        english: `With her purchases made, Olivia walked out of the store, satisfied. She had managed to buy everything she needed without overspending. As she left, she saw more people queueing up, eager to grab the best deals before prices increased.
She smiled, knowing she had made the right choices today.`,
        korean: `쇼핑을 마친 올리비아는 만족스러운 표정으로 가게를 나섰다. 과소비하지 않고 필요한 모든 것을 구매할 수 있었다. 가게를 떠나는 순간, 점점 더 많은 사람들이 줄을 서며 가격이 오르기 전에 최고의 상품을 구매하려고 하는 것을 보았다.
그녀는 미소를 지으며 오늘 좋은 선택을 했다는 것을 확신했다.`,
      },
    ],
  }
];

// Mark down (the price) : 물건값을 깎다/값을 내리다.
// Bring down (the price) : 물건값을 깎다/값을 내리다.
// Put up (the price) : 값을 올리다.
// Jack up (the price) : 값을 급격히 올리다.
// Try on ~ / Try ~ on : (신발, 옷, 모자 등이 맞는지) 입어 보다/신어 보다/써 보다
// Look for ~ : ~을 찾다.
// Go (well) with : ~와 (잘) 어울리다.
// Pick out ~ / Pick ~ out : ~을 선택하다/뽑아내다. 
// Queue up : 줄을 서다.
// Try out ~ / Try ~ out : 잘 되는지 시험 삼아 해 보다.
// Ring up ~ / Ring ~ up : (상점에서) 상품 가격을 입력해 고객이 물건값을 내도록 돕다/계산해 주다.