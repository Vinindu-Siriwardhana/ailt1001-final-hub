// AILT1001 Final Hub — content compiled from Lecture 1–9 slides (2026-27 Sem 1)
window.LECTURES = [
{
 id:"L1", n:1, title:"Introduction: Could a Machine Be Intelligent?", c1:"#0f766e", c2:"#5eaaa8",
 big:"Judge AI by what it can do — but a correct reply is not proof of understanding.",
 sections:[
  ["Why this course", [
   "You <b>use</b> AI (learn, communicate, prepare) <i>and</i> AI is <b>used on you</b> (evaluate, screen, select).",
   "Three goals: <b>UNDERSTAND</b> how AI works · <b>USE</b> it effectively · <b>DECIDE</b> when to trust it."
  ]],
  ["From biological neurons to modern AI (timeline)", [
   "Brain ≈ <b>86 billion</b> biological neurons → inspired the idea.",
   "<b>1943</b> Artificial neuron — numbers in → number out.",
   "<b>1958</b> Perceptron — learns weights from examples.",
   "<b>1986</b> Backpropagation — error guides weight updates.",
   "<b>2012</b> Deep learning (AlexNet) — more layers + data + GPUs.",
   "<b>2017</b> Transformer — <b>attention</b> connects context.",
   "<b>2020s</b> Modern LLMs — transformers + pretraining + scale.",
   "Slogan: <i>Inspired by biology. Built from math, data, and computing.</i>"
  ]],
  ["Could a machine be intelligent?", [
   "Brain: living neurons, electrical + chemical signals. LLM: learned numerical weights, calculations on hardware.",
   "<b>Turing Test (1950)</b>: a human judge chats by <b>text only</b> with a human and an AI. If the judge can't reliably tell → AI passes. Turing's move: judge AI by <b>what it can do</b>.",
   "Intelligence is more than chat: perceive, learn, reason, plan, act, adapt, create (e.g. humanoid robot running 100 m; understanding sarcasm)."
  ]],
  ["Searle's Chinese Room (1980)", [
   "A person who knows no Chinese follows a <b>rulebook</b> (match symbols → choose reply) and produces appropriate Chinese replies.",
   "Lesson: <b>a correct reply ≠ proof of understanding</b>."
  ]],
  ["AI can help — should it decide?", [
   "Drafting a group message = <b>lower stakes</b>; deciding a scholarship = <b>higher stakes</b>.",
   "Higher stakes require <b>stronger evidence, stronger checks, and someone responsible</b>."
  ]]
 ]
},
{
 id:"L2", n:2, title:"How Neural Networks Learn", c1:"#c2410c", c2:"#f4a261",
 big:"Inference = use fixed knobs. Training = search for knob settings that match known data; backprop updates all knobs at once.",
 sections:[
  ["Why learn how it works", [
   "Pilot analogy: pilots don't build planes, but understanding flight reveals limits and warning signs.",
   "Knowing how AI learns/predicts reveals its <b>capabilities, limits and possible failures</b> → helps decide when to trust it."
  ]],
  ["Parts of a neural network", [
   "<b>Input nodes</b> receive input values (e.g. hours of sleep, hours of study).",
   "<b>Synapses</b> carry signals between nodes.",
   "<b>Weights</b> (“knobs”) strengthen or weaken each signal.",
   "<b>Artificial neurons (Σ)</b> combine (add) inputs and produce one output.",
   "<b>ReLU</b> activation: positive signals pass, negatives become 0."
  ]],
  ["Inference (using the network)", [
   "Example: inputs 8 and 2, weights 6 and 2 → 8×6 = 48, 2×2 = 4 → Σ = 52 → ReLU(52) = 52. Repeat through layers → output (predicted score).",
   "Running example: <b>AILT test-score predictor</b> — a black box. Would you trust it if you don't know how it works?"
  ]],
  ["Training (finding the knob positions)", [
   "Uses <b>known training data</b> (e.g. Apple: 3 h sleep, 5 h study → 75; Rainbow: 5 h, 1 h → 82; Sunny: 10 h, 2 h → 93).",
   "Goal: find knob settings so predictions match the known answers.",
   "<b>Brute force fails</b>: 9 knobs × 10 positions = 10⁹ combos ≈ 3 years at 10 tries/s. DeepSeek‑V4 Pro has ≈ <b>1.7 trillion</b> knobs.",
   "<b>Backpropagation</b>: uses the error to give a useful direction for updating <b>all knobs at the same time</b>."
  ]],
  ["Architecture", [
   "<b>Input layer</b> → <b>hidden layer(s)</b> → <b>output layer</b>. Can add inputs, hidden layers, neurons per layer, or outputs.",
   "Same idea, different inputs/outputs: numbers → score; low‑res image → high‑res (<b>super‑resolution</b>); previous words → <b>next word</b>."
  ]],
  ["Course assessment", ["Final test 40% · Group project 40% · Lecture participation 20%."]]
 ]
},
{
 id:"L3", n:3, title:"Large Language Models", c1:"#4d7c0f", c2:"#a3b18a",
 big:"An LLM predicts the next token, samples one, repeats. Training changes weights (pre‑train → fine‑tune → human feedback); inference uses context with fixed weights.",
 sections:[
  ["Why language", [
   "Language = a <b>meta‑tool</b> (a tool for creating tools): creates new tools, shares knowledge, improves over time, passes knowledge across generations.",
   "Why it's hard: <b>Complex</b> (idioms: “broke the ice”) · <b>Ambiguous</b> (“I saw her duck”) · <b>Creative</b> (new slang) · <b>Layered</b> (stress: “<i>YOU</i> ate my cake?” vs “You ate <i>MY</i> cake?”)."
  ]],
  ["The core idea: predict what comes next", [
   "“The robot made breakfast, but burned the …” → toast 58%, eggs 16%, bread 3% … = <b>probability distribution over next tokens</b>.",
   "Reply = repeat next‑token prediction until an <b>&lt;end&gt;</b> token.",
   "<b>Token</b> = a piece of text: a word, part of a word, or punctuation (“unbelievable!” splits into pieces). Tokenisation varies by model. Token → ID → <b>embedding</b> (list of numbers).",
   "<b>Sampling</b>: a token is drawn from the distribution (bigger share = more likely) → the <b>same prompt can give different outputs</b>."
  ]],
  ["Three training stages", [
   "<b>Stage I — Pre‑training</b> on huge text collections → <b>Base</b> model. E.g. FineWeb from Common Crawl (one crawl ≈ 2.14 billion pages). Pipeline: URL filtering → text extraction → language filtering → quality filter + <b>deduplication</b> → <b>PII removal</b> (mask emails, IPs). Training nudges weights to make the actual next token more likely.",
   "<b>Stage II — Fine‑tuning</b> on checked example conversations (request → good response) → <b>Instruct</b> model. Same network, different data.",
   "<b>Stage III — Human feedback</b>: people compare answers A vs B → train a <b>reward model</b> that predicts preference scores → scores guide weight updates → <b>Aligned</b> model."
  ]],
  ["Training vs inference", [
   "<b>Training</b>: learn from examples & feedback — <b>weights change</b>.",
   "<b>Inference</b>: use context to generate the next token — <b>weights stay fixed</b>. A longer chat changes the <i>context</i>, not the weights."
  ]],
  ["Attention", [
   "Helps predict the next token using the <b>relevant earlier tokens</b>.",
   "“She cashed the cheque, then left the bank carrying the ___” → <i>money</i> (attends to cashed, cheque). “She caught the fish, then left the bank carrying the ___” → <i>fish</i>. Same word “bank”, different meaning from context."
  ]],
  ["From LLM to agent", ["An LLM generates tokens; an <b>agent</b> uses them to act: generated text is a tool instruction (e.g. click(…)) → software acts → result becomes new input → loop."]]
 ]
},
{
 id:"L4", n:4, title:"From LLMs to Chatbots", c1:"#1d4e89", c2:"#7fa7c9",
 big:"Chatbot = LLM + context + tools. The model's weights are fixed; everything it 'knows' about you or today comes from what's put in its context.",
 sections:[
  ["What's in the context", [
   "<b>Instructions</b> (AGENTS.md) · <b>Memory</b> (MEMORY.md) · <b>Prompt</b> (your message) · <b>Skill</b> (SKILL.md) · <b>Recent messages</b> · <b>Available tools</b> · <b>Tool results</b>.",
   "Tools: web, files, code, computer, another LLM…"
  ]],
  ["What a bare LLM can't do", [
   "Knowledge is <b>frozen at the training cutoff</b> (“Who won the 2026 World Cup?” → “hasn't happened yet”). Fix: <b>tools</b> (web_search → “Spain won”).",
   "It has <b>no memory</b> — each request is new (“Who am I?” → “I don't know”). Fix: include <b>recent messages</b> (“Hi, I am Bob”).",
   "<b>Instructions</b> shape replies (“Always answer in German”). <b>Memory</b> carries preferences across chats (“Vegetarian” → chickpea tacos). <b>Skills</b> give procedures (PPTX skill: template, one idea/slide, render & check)."
  ]],
  ["Agentic AI", [
   "Works <b>towards a goal</b> by using tools, <b>checking results</b>, and deciding what to do next: <b>Build → Test → Improve</b>.",
   "Different context, same model: <b>context changes, weights fixed</b>."
  ]],
  ["Context window", [
   "Context has a size limit (<b>context window</b>). When full → <b>compacting</b>: replace old messages with a summary.",
   "More context = more work → can mean slower replies."
  ]],
  ["Model names & sizes", [
   "<b>Qwen3.5‑9B</b>: Qwen = Alibaba's open‑weight family · 3.5 = version · 9B ≈ 9 billion weights.",
   "Fewer weights → less memory, faster, less capable. More weights → more memory, slower, more capable (phone vs Mac vs 8×GPU server ≈ HK$5M).",
   "<b>Open weights</b> (downloadable; you control the computer — Qwen, DeepSeek, Kimi, GLM) vs <b>closed weights</b> (provider controls — GPT, Claude, Gemini, Grok)."
  ]],
  ["Quantisation", [
   "Store weights with <b>fewer knob positions</b>: 16‑bit → 6‑bit (64 settings) → 4‑bit (16) → 3‑bit (8).",
   "Fewer bits = <b>less memory</b> (and often faster) but <b>risk of quality loss</b>. 6‑bit is usually close to the original."
  ]],
  ["Who runs the model?", [
   "<b>Self‑hosted</b>: open weights on your own local/cloud server; you manage it.",
   "<b>Managed service</b>: provider's server (open or closed weights); provider manages it.",
   "Key question: <b>who has access to your data?</b>"
  ]]
 ]
},
{
 id:"L5", n:5, title:"Beyond Text: Learning Across Modalities", c1:"#8e3b65", c2:"#d4a5a5",
 big:"Everything becomes numbers (pixels, audio samples, tokens). Diffusion makes images by learning to predict noise, then removing a little noise at a time.",
 sections:[
  ["Modalities", [
   "Text, image, audio, video — as input and/or output. E.g. text+image→text (ask about a picture), audio→text (transcribe), text→image, text→speech.",
   "<b>Multimodal language model</b> (e.g. Qwen3.5‑9B): text/image/video in → text out. A model's own capabilities differ from what the chatbot app offers with tools."
  ]],
  ["How images and audio become input", [
   "Image = pixels; each pixel has <b>Red, Green, Blue</b> values from <b>0–255</b>.",
   "Image → split into <b>patches</b> → <b>vision encoder</b> → image representations. Text → tokenisation + embedding → text representations. Both combine in context as <b>one ordered sequence</b> → language network.",
   "Speech = waveform; each dot is one <b>audio sample</b> → audio encoding → network (e.g. Parakeet → “What is two plus two?”).",
   "<b>Training connects modalities</b>: image + question + answer pairs; wrong answer (“a dog” for a cat) → adjust to make target answer more likely."
  ]],
  ["Inference uses fixed weights", ["Same image, new question → text representations change. Same question, new image → image representations change. <b>We change the input, not the trained weights.</b>"]],
  ["Specialist models as tools", [
   "A chatbot can call a specialist model as a tool (e.g. generate_image(…) → FLUX.2 klein).",
   "<b>The chatbot application can offer more capabilities than its central language model has by itself.</b>"
  ]],
  ["Diffusion — generating images", [
   "Challenge: a <b>plausible world</b> (not just sharp pixels — anatomy, coherence). Midjourney V1 (2022) → V6 (2023).",
   "Generation: start from <b>pure noise</b>; network (guided by the prompt, weights fixed) <b>estimates the noise → takes a small denoising step → repeat</b> (~10 steps) → final image.",
   "Training data: take a real image + <b>random noise</b> → noisy image (no neural network needed). Repeat with many images and noise levels.",
   "Training: network sees noisy image + noise amount + caption → predicts <b>estimated added noise</b> → compare with the <b>known added noise</b> → adjust weights to reduce error.",
   "Why it helps: noisy image − estimated noise → estimate of the clean image."
  ]],
  ["Video & deepfakes", [
   "Video challenge is not just realism but <b>consistency across shots</b> (same people, place, action).",
   "Familiar face + familiar voice → <b>apparent authority</b>. <b>Hong Kong 2024 deepfake video‑conference scam: HK$200 million lost.</b>",
   "Difference from film use: <b>consent, deception, harm</b>. Defence: <b>verify consequential requests through an independently trusted channel</b>."
  ]]
 ]
},
{
 id:"L6", n:6, title:"From Perception to Action: AI in Robotics", c1:"#a16207", c2:"#e9c46a",
 big:"Robots run a sense → think → act loop. They learn actions by imitation (examples) or reinforcement (rewards over the whole outcome).",
 sections:[
  ["Perception–action loop", ["Physical world →(sense)→ <b>Sensor</b> →(digital representation)→ <b>AI</b> →(instruction)→ <b>Actuator</b> →(action)→ physical world."]],
  ["Sensors", [
   "<b>Passive</b> sensors receive signals (visible camera, thermal camera). <b>Active</b> sensors emit signals (ToF depth camera, radar, LiDAR).",
   "<b>Proprioceptive</b> = sensing its own body: joint angle, wheel rotation, IMU (acceleration/rotation), battery voltage.",
   "<b>Exteroceptive</b> = sensing the environment: camera, ToF depth, scanning LiDAR, touch, microphone, GPS/GNSS, radar, force.",
   "<b>Sensor fusion</b> (camera + LiDAR + radar): <b>combined evidence reduces uncertainty; it does not remove it</b>. When conditions change (darkness, fog) uncertainty can grow again."
  ]],
  ["Learning actions", [
   "Crawler demo: <b>learning model</b> (table of action values) · <b>possible actions</b> (rotate either joint either way) · <b>simulation</b> (virtual trials) · <b>reward function</b> (scores outcomes: +6 forward, −4 back).",
   "<b>Deep reinforcement learning</b>: a deep neural network replaces the table and learns from reward.",
   "<b>Imitation learning</b>: examples/demonstrations show which actions to take. <b>Reinforcement learning</b>: consequences (rewards) guide action values. They can be combined.",
   "Action A (+6 now) vs B (−4 now): over 6 steps A totals <b>+26</b>, B totals <b>+32</b>. <b>A short‑term loss can lead to a greater long‑term gain</b> — RL learns from the <b>whole outcome</b>."
  ]],
  ["Simulation to reality", [
   "Real world adds <b>slipping, sensor noise, slow motors</b> (the sim‑to‑real gap).",
   "<b>Train under varied conditions. Test on the real robot.</b>"
  ]],
  ["VLA models", ["<b>Vision–Language–Action</b>: camera image + instruction (“Place the cup on its saucer”) → deep network → physical action; updated camera image feeds back. Demonstrations → imitation; reward feedback → RL."]],
  ["Human oversight & responsibility", [
   "Humans <b>monitor</b> the world, <b>set limits</b> on the AI, and <b>intervene</b> on actuators. If the robot causes harm, who is responsible?",
   "Driving automation levels: <b>0</b> Manual · <b>1</b> Assistance · <b>2</b> Supervised · <b>3</b> Takeover‑ready · <b>4</b> Driverless within limits · <b>5</b> Full automation.",
   "<b>Before relying on automation, check its limits, your role, and the legal requirements.</b>"
  ]]
 ]
},
{
 id:"L7", n:7, title:"AI for Discovery and Invention (Proteins)", c1:"#155e75", c2:"#67b7c7",
 big:"AlphaFold predicts protein shape from sequence (tested blindly in CASP); AI can also design new proteins — but every idea needs Propose → Test → Improve.",
 sections:[
  ["AI as an enabling layer", [
   "AI is a <b>horizontal enabling layer</b> across domains — like <b>electricity</b> and <b>the internet</b>.",
   "Top‑10 market cap: $11.2T (Oct 2022) → $31.0T (Oct 2026), ×2.78, led by NVIDIA. Is it a bubble?"
  ]],
  ["Proteins", [
   "Proteins do life's jobs: movement (muscle), digestion (enzymes), defence (antibodies), transport (hemoglobin carries O₂), signalling (insulin), support (collagen).",
   "<b>A protein's shape helps it do its job</b>: hemoglobin binds O₂ in the lungs and releases it in tissues.",
   "<b>Protein folding</b>: chain of amino acids (20 letters) → sequence → 3D shape. Can we predict shape from sequence?"
  ]],
  ["The old way", ["<b>X‑ray crystallography</b>: crystal → diffraction → structure. Kendrew (myoglobin, 1958), Perutz (hemoglobin, 1960). <b>12 years</b> for myoglobin's first structure; only ~100 PDB entries by 1982."]],
  ["CASP and AlphaFold", [
   "<b>CASP</b> = structure prediction competition, <b>blind</b> since 1994: predict <b>before</b> the experimental structure is seen, then compare.",
   "Score: <b>GDT (Global Distance Test)</b> — higher = closer match; ≈90 = competitive with experiments.",
   "Earlier crowd efforts: Rosetta@Home (distributed computing), Foldit (game). <b>AlphaFold 1 (2018)</b> jumped ahead; <b>AlphaFold 2 (2020)</b> reached ≈90+.",
   "AlphaFold <b>training</b>: learn from solved proteins, use prediction error to adjust weights. <b>Inference</b>: new sequence, fixed weights → predicted structure.",
   "Scale: ≈200K experimental PDB entries vs <b>200M+ AI predictions</b> (July 2022).",
   "2024 Nobel Prize in Chemistry: protein structure prediction (Hassabis, Jumper) and protein design (Baker). Hinton (from L1's 2012 AlexNet) — Physics."
  ]],
  ["AI protein design", [
   "Natural proteins are a tiny corner of all possible sequences. <b>AI can propose new sequences for a purpose.</b>",
   "Evolution favours survival & reproduction; design has a chosen goal (e.g. <b>bind and block a snake toxin</b>): AI proposes a shape → AI chooses a sequence → AI predicts folding & binding → <b>researchers make and test</b>.",
   "Applications: antivenoms, vaccines, targeted medicines, biosensors, crop protection, recycling enzymes."
  ]],
  ["Testing AI's ideas", [
   "AI maths at scale: <b>verification</b> (does the argument follow?) vs <b>understanding</b> (why does it work? when can we use it?). Is a correct proof enough?",
   "<b>Propose → Test → Improve</b>: protein (measure function → revise design), program (run tests → fix code), proof (check argument → repair reasoning).",
   "Key question: <b>How was it tested, and what hasn't been tested yet?</b>"
  ]]
 ]
},
{
 id:"L8", n:8, title:"AI Ethics: Values, Fairness, Accountability", c1:"#9b2226", c2:"#e07a5f",
 big:"Ask three questions: What should it prioritise? Who benefits and who bears the harm? Who must justify and correct it? Overall accuracy can hide unequal errors.",
 sections:[
  ["Three questions", ["<b>Values</b> — what should AI prioritise? · <b>Fairness</b> — who benefits, who bears the harm? · <b>Accountability</b> — who must justify the decision?"]],
  ["Trolley problems", [
   "<b>Switch</b>: pull the lever = <b>redirect a threat</b>. <b>Footbridge</b>: push a person = <b>use a person as the means</b>. Both: five survive, one dies — yet most judge them differently.",
   "<b>Saving more lives matters. How we save them matters too.</b>",
   "Reasons: “save the most lives” = <b>consequences</b>; “duties to help and not harm” = <b>duties</b>; “the person sacrificed has rights” = <b>rights</b>."
  ]],
  ["Self‑driving cars", [
   "Car can't stop: hit 2 pedestrians or swerve and kill its passenger? Which car would you buy?",
   "Rules are set <b>before the journey</b> (priorities, limits) but applied <b>when danger appears</b> (action under uncertainty). Who must justify these choices?",
   "<b>Moral Machine</b> survey: people preferred saving humans over pets (+58.3), more lives (+50.8), younger (+49.0), higher status (+34.5). <b>Should these preferences become rules?</b>",
   "Imperfect system: 100 → 70 deaths/yr = 30 lives/yr, 300 over 10 years. <b>Is that enough if pedestrians face more risk?</b> (distribution of harm)"
  ]],
  ["Tragedy of the commons", [
   "Field of 20 grass, 4 players: 2 sheep each → field recovers; 3 each → 16 grass next round.",
   "<b>Individual reward</b> (my extra sheep) vs <b>shared consequence</b> (less grass for everyone). <b>Better AI optimisation does not guarantee better shared outcomes.</b>"
  ]],
  ["Case study: COMPAS", [
   "Criminal justice, Broward County, Florida. Risk of reoffending score <b>1–10</b> (1–4 low, 5–7 medium, 8–10 high) → judge decides <b>release or detain</b>. <b>A prediction can affect a person's freedom.</b>",
   "Pipeline: people provide data (questionnaire + records) → COMPAS estimates (statistical model from past cases) → people decide. <b>Commercial software (Northpointe/Equivant); scoring formula not public.</b>",
   "What should count? Criminal history, a parent's imprisonment, how often you moved… <b>Predictive does not automatically mean appropriate.</b>",
   "<b>False positive</b> = labelled higher risk (5–10) but <b>not</b> rearrested. <b>False negative</b> = labelled lower risk (1–4) but rearrested. <b>Different mistakes, different consequences.</b>",
   "Dressel & Farid 2018 (1,000 defendants): COMPAS FPR White 25.4% vs <b>Black 40.4%</b>; FNR <b>White 47.9%</b> vs Black 30.9%. <b>Overall accuracy can hide unequal errors.</b>",
   "Untrained online crowd: accuracy ≈67–68% vs COMPAS ≈65%, with similar unequal error pattern. <b>Similar accuracy. Unequal errors in both.</b>"
  ]],
  ["Accountability", [
   "<b>Justify</b> (why use this system?) · <b>Challenge</b> (how can a person contest it?) · <b>Correct</b> (who can change the outcome?).",
   "<b>“The AI said so” is not a justification. AI does not remove human responsibility.</b>"
  ]]
 ]
},
{
 id:"L9", n:9, title:"Philosophy of AI: Understanding, Experience, Control", c1:"#3d405b", c2:"#9a8c98",
 big:"Three questions: Does it understand? Could it feel? Can we keep control? Capability alone does not justify authority.",
 sections:[
  ["Beyond capability", ["ICU bed (best odds or equal chance?), courtroom (advise or decide?), car (passenger or pedestrians?). <b>Capability alone does not justify authority.</b>"]],
  ["Understanding", [
   "Hassabis (DeepMind): “Solve intelligence, then use it to solve everything else.” Would solving problems mean understanding them?",
   "<b>Turing's Imitation Game (1950)</b>: test the performance — convincing conversation is evidence of <b>ability</b>. Does it establish understanding?",
   "<b>Searle's Chinese Room (1980)</b>: symbol manipulation by rulebook. <b>Manipulating symbols ≠ understanding meaning</b>; <b>syntax alone is not sufficient for semantics</b>.",
   "<b>Grounding problem</b>: how does the word “cat” connect to actual cats? Learning through text vs through interaction (see, hear, touch). <b>Perception and action offer a route to grounding</b> (describe → recognise unfamiliar cats → robot investigates).",
   "Better test: look beyond one right answer — <b>can it use what it knows in a new situation?</b>"
  ]],
  ["Experience", [
   "Chatbot says “I am frightened. Please do not switch me off.” Does it feel fear?",
   "<b>Mary's Room (Frank Jackson, 1982)</b>: Mary knows every physical fact about colour vision but has never seen colour. On seeing red, does she learn something new?",
   "<b>Consciousness = having subjective experiences.</b> Could AI have experiences of its own?",
   "Why it matters: <b>if AI could suffer, its welfare would matter</b>; <b>even if it feels nothing, it could still harm people</b>."
  ]],
  ["Control", [
   "Turing (1951): “…we should have to expect the machines to take control.” <b>Greater capability ≠ greater human control.</b>",
   "A human supervisor may not be enough: <b>too fast</b> (can't intervene in time), <b>too many actions</b> (can't review all), <b>too complex</b> (can't judge reliably).",
   "<b>Recursive self‑improvement</b>: AI helps improve AI → more capable AI → better at improving AI. Can we supervise systems that outperform us?",
   "<b>Hosted AI</b>: developer runs it and can press Stop. <b>Open‑weight AI</b>: released copies keep running independently. <b>Control shifts from the developer to the operators.</b>"
  ]],
  ["Final test rules (from L9)", [
   "<b>Wed 25 Nov</b>, short‑answer, <b>closed book</b>, on Ed with laptop/tablet (no phones). Check Ed for slot + venue; arrive ≥1 h early (late = not admitted).",
   "No AI, notes, other tabs, plugins or translation. Unauthorised tools → course failure + misconduct. Unapproved absence → fail the whole course. Makeup (approved only): Wed 2 Dec, 8 AM."
  ]]
 ]
}
];

// Multiple-choice quiz: a = index of correct option
window.MCQ = [
{l:"L1",q:"What was Alan Turing's key shift in the 1950 Imitation Game?",o:["Measure a machine's number of neurons","Judge a machine by what it can do in conversation","Require a machine to be conscious","Test machines on mathematics only"],a:1,e:"Turing replaced “can machines think?” with a behavioural test: can a judge tell it apart from a human by text alone?"},
{l:"L1",q:"The Chinese Room argument is used to show that…",o:["Computers cannot translate Chinese","Producing correct replies is not proof of understanding","Rulebooks are faster than people","The Turing Test is too hard"],a:1,e:"The person follows rules to give appropriate replies without understanding Chinese."},
{l:"L1",q:"Which year/breakthrough is matched correctly?",o:["1958 — Transformer","1986 — Backpropagation","2017 — Perceptron","2012 — Artificial neuron"],a:1,e:"1943 neuron, 1958 perceptron, 1986 backprop, 2012 deep learning, 2017 transformer."},
{l:"L1",q:"Why should a scholarship decision get more scrutiny than drafting a group message?",o:["It uses more tokens","It is higher stakes — needs stronger evidence, checks and someone responsible","AI cannot read applications","Group messages are illegal to automate"],a:1,e:"Higher stakes → stronger evidence, stronger checks, someone responsible."},
{l:"L1",q:"The 2017 Transformer's key contribution was…",o:["GPUs","Attention that connects context","Backpropagation","The perceptron"],a:1,e:"Transformers use attention to relate tokens across the context."},
{l:"L2",q:"Inputs 8 and 2 with weights 6 and 2 feed a neuron that adds and applies ReLU. Output?",o:["16","52","10","96"],a:1,e:"8×6 + 2×2 = 48 + 4 = 52; ReLU keeps positive values → 52."},
{l:"L2",q:"What does ReLU do?",o:["Doubles every signal","Passes positive signals, turns negatives into 0","Normalises to 0–1","Removes the largest value"],a:1,e:"ReLU(x) = max(0, x)."},
{l:"L2",q:"In the course's analogy, the 'knobs' of a neural network are its…",o:["Inputs","Weights","Layers","Tokens"],a:1,e:"Weights strengthen or weaken signals — the knobs set during training."},
{l:"L2",q:"Why can't we train large networks by brute-force trying every knob setting?",o:["It is illegal","The combinations explode (10⁹ for just 9 knobs; models have trillions)","Computers can't store weights","Data is too small"],a:1,e:"Backpropagation instead gives a direction to update all knobs at once."},
{l:"L2",q:"Backpropagation…",o:["Searches knob settings one at a time","Uses the error to update all weights at the same time","Adds more layers","Removes training data"],a:1,e:"Error guides simultaneous updates to all weights."},
{l:"L2",q:"During inference, the weights of a trained network…",o:["Change with every input","Stay fixed","Are randomised","Are deleted"],a:1,e:"Inference uses fixed weights; training changes them."},
{l:"L2",q:"Predicting a high-resolution image from a low-resolution one is called…",o:["Tokenisation","Super-resolution","Quantisation","Fine-tuning"],a:1,e:"Same network idea, different inputs/outputs."},
{l:"L3",q:"At its core, an LLM…",o:["Looks up answers in a database","Predicts a probability distribution over the next token","Copies web pages","Understands meaning by rules"],a:1,e:"Repeat next-token prediction until an end token."},
{l:"L3",q:"Why can the same prompt give different replies?",o:["Weights change every time","The next token is sampled from a probability distribution","The internet changed","Tokens are random"],a:1,e:"Sampling picks tokens by probability, so outputs vary."},
{l:"L3",q:"A token is…",o:["Always a whole word","A piece of text: a word, part of a word, or punctuation","A single letter","A sentence"],a:1,e:"Tokenisation varies by model."},
{l:"L3",q:"Which order of LLM training stages is correct?",o:["Fine-tuning → Pre-training → Human feedback","Pre-training → Fine-tuning → Human feedback","Human feedback → Pre-training → Fine-tuning","Pre-training → Human feedback → Fine-tuning"],a:1,e:"Base model → Instruct model → Aligned model."},
{l:"L3",q:"Stage I pre-training produces a…",o:["Base model","Instruct model","Aligned model","Reward model"],a:0,e:"Pre-training on text collections → base model."},
{l:"L3",q:"In Stage III, people compare answers. What learns from those comparisons?",o:["A tokenizer","A reward model that predicts preference scores","The web crawler","A vision encoder"],a:1,e:"The reward model's scores then guide the LLM's weight updates."},
{l:"L3",q:"Which is NOT a step in the FineWeb data pipeline?",o:["URL filtering","Deduplication","PII removal","Human-written answers for every page"],a:3,e:"Pipeline: URL filter → text extraction → language filter → quality filter + dedup → PII removal."},
{l:"L3",q:"“She caught the fish, then left the bank carrying the ___” → fish. Which mechanism uses 'caught' and 'fish' to predict this?",o:["Quantisation","Attention","ReLU","Compacting"],a:1,e:"Attention focuses on relevant earlier tokens."},
{l:"L3",q:"A longer conversation with a chatbot changes…",o:["The weights","The context","The vocabulary","The training data"],a:1,e:"Inference: context changes, weights fixed."},
{l:"L3",q:"“I saw her duck” illustrates that language is…",o:["Layered","Ambiguous","Creative","Complex"],a:1,e:"Ambiguity — duck the bird or duck the action."},
{l:"L3",q:"What turns an LLM into an agent?",o:["More parameters","Its generated tokens are used as tool instructions whose results feed back in","Removing the context window","Human feedback"],a:1,e:"LLM generates; agent acts and loops."},
{l:"L4",q:"A bare LLM says the 2026 World Cup hasn't happened. Best fix?",o:["Retrain from scratch","Give it a web-search tool so the result enters its context","Quantise it","Increase temperature"],a:1,e:"Knowledge is frozen at the training cutoff; tools bring fresh info into context."},
{l:"L4",q:"Why does a bare LLM not know who you are in a new request?",o:["It has no built-in memory; each request is new","Privacy law","The weights are too small","It is quantised"],a:0,e:"Memory comes from putting recent messages or MEMORY.md into context."},
{l:"L4",q:"Which file in the chatbot example stores persistent preferences across chats (e.g. 'vegetarian')?",o:["AGENTS.md","MEMORY.md","SKILL.md","slides.pptx"],a:1,e:"AGENTS.md = instructions; MEMORY.md = memory; SKILL.md = procedures."},
{l:"L4",q:"When the context window fills up, chatbots often…",o:["Delete the model","Compact: replace old messages with a summary","Change the weights","Switch language"],a:1,e:"Compacting frees space."},
{l:"L4",q:"In 'Qwen3.5-9B', '9B' means…",o:["9 billion tokens of training data","About 9 billion learned weights","Version 9","9 GB of memory"],a:1,e:"Qwen = family (Alibaba), 3.5 = version, 9B ≈ weights."},
{l:"L4",q:"Quantisation from 16-bit to 4-bit mainly…",o:["Adds knowledge","Reduces memory by using fewer knob positions, risking some quality loss","Increases model size","Removes the context window"],a:1,e:"4-bit = 16 settings per weight."},
{l:"L4",q:"Open-weight vs closed-weight models differ mainly in…",o:["Whether they use tokens","Whether the weights can be downloaded and run on computers you control","Whether they are multimodal","Whether they were trained with backprop"],a:1,e:"Closed: provider controls the computer."},
{l:"L4",q:"The key privacy question when choosing self-hosted vs managed service is…",o:["Which is faster","Who has access to your data","Which has more tokens","Which is newer"],a:1,e:"Self-hosted: you manage; managed: provider's servers."},
{l:"L4",q:"Agentic AI is best described as…",o:["A chatbot with a bigger model","AI that works towards a goal by using tools, checking results and deciding next steps","AI with no context","A quantised model"],a:1,e:"Build → Test → Improve."},
{l:"L5",q:"Each RGB channel of a pixel takes values in the range…",o:["0–1","0–100","0–255","−1 to 1"],a:2,e:"8-bit per channel."},
{l:"L5",q:"How does a multimodal model take in an image?",o:["It reads the filename","Patches → vision encoder → image representations combined with text in one ordered sequence","It converts it to audio","It ignores it"],a:1,e:"Image + text representations form the context."},
{l:"L5",q:"Asking a new question about the same image changes…",o:["The image representations and weights","The text representations (context), not the weights","Only the weights","Nothing"],a:1,e:"We change the input, not the trained weights."},
{l:"L5",q:"How do diffusion models generate an image?",o:["Add one pixel at a time like tokens","Start from noise and repeatedly estimate and remove a little noise","Search the web for a matching photo","Blend existing images"],a:1,e:"Estimate noise → small denoising step → repeat."},
{l:"L5",q:"In diffusion training, what does the network learn to predict?",o:["The caption","The added noise","The next token","The pixel count"],a:1,e:"Compare estimated vs known added noise, adjust weights."},
{l:"L5",q:"Creating noisy training images for diffusion requires…",o:["A trained neural network","No neural network — just add random noise to real images","Human labelling of noise","A vision encoder"],a:1,e:"Noisy image = original + random noise."},
{l:"L5",q:"A chatbot that calls FLUX via generate_image shows that…",o:["Its LLM can natively draw","The application can offer more capabilities than its central LLM alone","Images are tokens","Diffusion is an LLM"],a:1,e:"Specialist model as a tool."},
{l:"L5",q:"Main challenge for AI video beyond realism?",o:["File size","Consistency of people, place and action across shots","Colour depth","Frame rate"],a:1,e:"Kling multi-shot boxing example."},
{l:"L5",q:"Recommended defence against deepfake requests (e.g. HK$200M HK scam)?",o:["Trust video calls with familiar faces","Verify consequential requests through an independently trusted channel","Ask for a longer video","Use a bigger screen"],a:1,e:"Familiar face + voice ≠ proof."},
{l:"L6",q:"Correct order of the perception–action loop?",o:["Actuator → Sensor → AI → World","World → Sensor → AI → Actuator → World","AI → World → Sensor → Actuator","Sensor → Actuator → AI → World"],a:1,e:"Sense → digital representation → instruction → action."},
{l:"L6",q:"Which is a proprioceptive sensor?",o:["LiDAR","GPS","Joint-angle sensor","Microphone"],a:2,e:"Proprioceptive = senses the robot's own body."},
{l:"L6",q:"Which sensor is active (emits a signal)?",o:["Visible camera","Thermal camera","Radar","Microphone"],a:2,e:"Radar, LiDAR, ToF depth camera are active."},
{l:"L6",q:"Sensor fusion…",o:["Removes uncertainty completely","Reduces uncertainty but does not remove it","Only works in daylight","Replaces the AI"],a:1,e:"Fog/darkness can make uncertainty grow again."},
{l:"L6",q:"Imitation learning learns from ___; reinforcement learning learns from ___.",o:["rewards; demonstrations","demonstrations/examples; consequences/rewards","text; images","simulation; reality"],a:1,e:"The two can be combined."},
{l:"L6",q:"Action A gives +6 now (sequence total +26); B gives −4 now (total +32). RL should learn to favour…",o:["A, because +6 > −4","B, because it leads to a greater total reward","Neither","Whichever is random"],a:1,e:"A short-term loss can lead to a greater long-term gain."},
{l:"L6",q:"Which is NOT one of the sim-to-real problems shown?",o:["Slipping","Sensor noise","Slow motor","Tokenisation"],a:3,e:"Train under varied conditions; test on the real robot."},
{l:"L6",q:"A VLA model maps…",o:["Voice → language → audio","Vision + language instruction → physical action","Video → loss → accuracy","Values → laws → accountability"],a:1,e:"Vision–Language–Action."},
{l:"L6",q:"Driving automation level 3 is…",o:["Assistance","Supervised","Takeover-ready","Full automation"],a:2,e:"0 Manual, 1 Assistance, 2 Supervised, 3 Takeover-ready, 4 Driverless within limits, 5 Full."},
{l:"L6",q:"In the crawler demo, the reward function…",o:["Chooses the next action","Scores the outcome of an action","Simulates the world","Moves the joints"],a:1,e:"e.g. +6 forward, −4 backward."},
{l:"L7",q:"AI described as a 'horizontal enabling layer' is compared to…",o:["Smartphones and TV","Electricity and the internet","Cars and planes","Books and radio"],a:1,e:"It enables many domains at once."},
{l:"L7",q:"Why does protein shape matter?",o:["It determines colour","A protein's shape helps it do its job","It sets the number of amino acids","It doesn't"],a:1,e:"E.g. hemoglobin binds/releases oxygen."},
{l:"L7",q:"What makes CASP a fair test of structure prediction?",o:["Predictions are made before the experimental structure is seen (blind)","Teams see the answers first","It uses only AI","It's a game"],a:0,e:"Blind assessment since 1994, scored by GDT."},
{l:"L7",q:"A higher GDT score means…",o:["A larger protein","A prediction closer to the experimental structure","More amino acids","Faster prediction"],a:1,e:"≈90 is competitive with experiments."},
{l:"L7",q:"Roughly how many AlphaFold predicted structures were released by July 2022?",o:["≈200 thousand","≈2 million","200 million+","≈100"],a:2,e:"vs ≈200K experimental PDB entries."},
{l:"L7",q:"The old experimental method for protein structure was…",o:["MRI","X-ray crystallography","Radar","Sequencing"],a:1,e:"Crystal → diffraction → structure; myoglobin took 12 years."},
{l:"L7",q:"In AI protein design for antivenom, who makes the final check?",o:["The AI alone","Researchers make and test the protein","Patients","CASP judges"],a:1,e:"AI proposes shape & sequence, predicts binding; researchers make and test."},
{l:"L7",q:"Propose → Test → Improve for a program means…",o:["Write code → run tests → fix the code","Write code → publish → forget","Measure function → revise design","Check argument → repair reasoning"],a:0,e:"Protein: measure function; proof: check argument."},
{l:"L7",q:"For an AI-produced proof, 'verification' asks ___ and 'understanding' asks ___.",o:["Is it long? / Is it new?","Does the argument follow? / Why does it work and when can we use it?","Who wrote it? / Who reads it?","Is it AI? / Is it human?"],a:1,e:"Is a correct proof enough?"},
{l:"L8",q:"Pulling the lever in the Switch case is described as…",o:["Using a person as a means","Redirecting a threat","Inaction","Lying"],a:1,e:"Footbridge = using a person as the means."},
{l:"L8",q:"“The person being sacrificed has rights” appeals to…",o:["Consequences","Duties","Rights","Efficiency"],a:2,e:"Consequences = save most; duties = help/not harm."},
{l:"L8",q:"In the Moral Machine survey, the strongest preference shown was for saving…",o:["Higher status over lower status","Humans over pets","Younger over older","Passengers over pedestrians"],a:1,e:"+58.3 humans over pets; +50.8 more lives; +49.0 younger; +34.5 higher status."},
{l:"L8",q:"The tragedy of the commons teaches that…",o:["AI always helps the group","Better optimisation for individual reward doesn't guarantee better shared outcomes","Sheep are inefficient","Sharing is impossible"],a:1,e:"My reward vs our shared resource."},
{l:"L8",q:"COMPAS outputs…",o:["A sentence length","A 1–10 risk-of-reoffending score that judges use","A guilty/not guilty verdict","A bail amount"],a:1,e:"People provide data → COMPAS estimates → people decide."},
{l:"L8",q:"A COMPAS false positive is someone who was…",o:["Scored lower risk and rearrested","Scored higher risk and not rearrested","Scored higher risk and rearrested","Never scored"],a:1,e:"False negative = lower risk but rearrested."},
{l:"L8",q:"Dressel & Farid (2018) found COMPAS's false positive rate was higher for…",o:["White defendants","Black defendants","Both equal","Women only"],a:1,e:"FPR White 25.4% vs Black 40.4%."},
{l:"L8",q:"Untrained online participants compared with COMPAS…",o:["Were far worse","Had similar accuracy and similarly unequal errors","Were perfect","Had no errors for any group"],a:1,e:"Similar accuracy. Unequal errors in both."},
{l:"L8",q:"“Predictive does not automatically mean appropriate” refers to…",o:["Using information like a parent's imprisonment or moving house in risk scores","GPU speed","Token sampling","Diffusion noise"],a:0,e:"Some predictive features may still be unfair to use."},
{l:"L8",q:"Which is NOT one of the accountability questions?",o:["Justify — why use this system?","Challenge — how can a person contest it?","Correct — who can change the outcome?","Optimise — how can it get cheaper?"],a:3,e:"'The AI said so' is not a justification."},
{l:"L8",q:"Why might deploying an autonomous car that cuts deaths from 100 to 70 still be contested?",o:["30 lives isn't enough","The remaining risk may shift onto groups like pedestrians — who bears the harm matters","Cars are expensive","It has no sensors"],a:1,e:"Fairness: distribution of harm, not just totals."},
{l:"L9",q:"Searle's conclusion from the Chinese Room is that…",o:["Syntax alone is not sufficient for semantics","Computers can never speak Chinese","The Turing Test is sufficient","Rulebooks understand meaning"],a:0,e:"Manipulating symbols ≠ understanding meaning."},
{l:"L9",q:"The grounding problem asks…",o:["How robots stay on the ground","How words like 'cat' connect to actual things in the world","How electricity reaches GPUs","How to fit models on phones"],a:1,e:"Perception and action offer a route to grounding."},
{l:"L9",q:"Mary's Room (Frank Jackson, 1982) is about…",o:["Whether knowing all physical facts captures the experience of seeing red","Robot control","Protein folding","Fairness in courts"],a:0,e:"Consciousness = having subjective experiences."},
{l:"L9",q:"Consciousness is defined in the course as…",o:["Being able to talk","Having subjective experiences","Passing the Turing Test","Having many weights"],a:1,e:"Could AI have experiences of its own?"},
{l:"L9",q:"“Even if AI feels nothing…”",o:["…it can't do harm","…it could still harm people","…it is conscious","…it understands"],a:1,e:"If AI could suffer, its welfare would matter; even if not, it could still harm people."},
{l:"L9",q:"Which is NOT a reason a human supervisor may not be enough?",o:["Too fast","Too many actions","Too complex","Too cheap"],a:3,e:"Too fast, too many actions, too complex."},
{l:"L9",q:"Recursive self-improvement refers to…",o:["Humans retraining annually","AI helping improve AI, making it better at improving AI","Compacting context","Fine-tuning on chats"],a:1,e:"Can we supervise systems that outperform us?"},
{l:"L9",q:"Why is open-weight AI harder for a developer to stop?",o:["It's encrypted","Released copies run independently even if the developer stops its service","It has no weights","It is hosted"],a:1,e:"Control shifts from the developer to the operators."},
{l:"L9",q:"“Capability alone does not justify authority” means…",o:["Capable AI should always decide","Even if AI performs well, whether it should decide is a separate question","AI is never capable","Authority requires more GPUs"],a:1,e:"ICU, courtroom, car examples."},
{l:"L9",q:"A better test of understanding than one right answer is…",o:["Longer answers","Whether it can use what it knows in a new situation","Faster replies","Higher GDT"],a:1,e:"Look beyond one right answer."}
];

// Short-answer practice (the final test is short-answer)
window.SAQ = [
{l:"L1",q:"Explain the Turing Test and one limitation of using it to decide whether a machine is intelligent.",a:"<p>A human judge holds <b>text‑only</b> conversations with a human and an AI; if the judge <b>cannot reliably tell</b> which is which, the AI passes. Turing's idea: judge a machine by <b>what it can do</b>.</p><p><b>Limitation:</b> it only tests conversational performance. Convincing conversation is evidence of ability, but (as Searle's Chinese Room shows) <b>a correct reply is not proof of understanding</b>. It also ignores other abilities (perceive, act, plan).</p>"},
{l:"L1",q:"Describe the Chinese Room and what it is meant to show.",a:"<p>A person who knows no Chinese sits in a room with a <b>rulebook</b>. Chinese questions come in; they <b>match symbols and choose replies</b> by the rules, producing appropriate answers. Outsiders think the room understands Chinese.</p><p>Point: <b>manipulating symbols ≠ understanding meaning</b> — syntax alone isn't sufficient for semantics. So an AI giving correct answers doesn't prove it understands.</p>"},
{l:"L2",q:"Explain the difference between training and inference in a neural network, using the AILT test-score predictor.",a:"<p><b>Training:</b> use <b>known data</b> (e.g. sleep 3 h, study 5 h → score 75) to search for weight (“knob”) settings so predictions match the known answers; <b>weights change</b> (via backpropagation).</p><p><b>Inference:</b> feed new inputs (e.g. 8 h sleep, 5 h study) through the network with <b>fixed weights</b>: multiply by weights, add at neurons, apply ReLU, layer by layer → predicted score.</p>"},
{l:"L2",q:"Why is backpropagation needed instead of trying all weight combinations?",a:"<p>Brute force explodes: just <b>9 knobs × 10 positions = 10⁹</b> combinations (≈3 years at 10 tries/s), and real models have <b>billions–trillions</b> of weights (DeepSeek ≈1.7T).</p><p><b>Backpropagation</b> uses the prediction <b>error</b> to compute a useful direction to update <b>all weights at the same time</b>, so training is feasible.</p>"},
{l:"L2",q:"Compute: a neuron receives inputs 3 and 5 with weights 2 and −4, sums them, then applies ReLU. What is the output, and why?",a:"<p>3×2 + 5×(−4) = 6 − 20 = <b>−14</b>. ReLU turns negatives into 0, so the output is <b>0</b>.</p>"},
{l:"L3",q:"Explain how an LLM produces a full reply, and why the same prompt can give different outputs.",a:"<p>Text is split into <b>tokens</b> → embeddings → transformer network outputs a <b>probability distribution</b> over the next token. A token is <b>sampled</b>, appended, and the process <b>repeats</b> until an <b>&lt;end&gt;</b> token.</p><p>Because tokens are <b>sampled</b> (not always the top one), the same prompt can yield different replies, even though the weights are fixed.</p>"},
{l:"L3",q:"Describe the three stages of LLM training and what model each produces.",a:"<ol><li><b>Pre‑training</b> on huge filtered text collections (e.g. FineWeb from Common Crawl) — learn to predict the next token → <b>Base model</b>.</li><li><b>Fine‑tuning</b> on checked example conversations (request → response) → <b>Instruct model</b> that follows instructions.</li><li><b>Human feedback</b>: people compare pairs of answers → train a <b>reward model</b> → its scores guide weight updates → <b>Aligned model</b>.</li></ol>"},
{l:"L3",q:"What is attention? Give an example.",a:"<p>Attention lets the model use the <b>most relevant earlier tokens</b> in the context when predicting the next token.</p><p>“She <b>cashed</b> the <b>cheque</b>, then left the bank carrying the ___” → <i>money</i>; “She <b>caught</b> the <b>fish</b>, then left the bank carrying the ___” → <i>fish</i>. Same word “bank”, different meaning based on context.</p>"},
{l:"L3",q:"Name two steps used to clean web data before pre-training and why each matters.",a:"<ul><li><b>Deduplication</b> (MinHash) — avoid over‑learning repeated text.</li><li><b>PII removal</b> — mask emails/IP addresses to protect privacy.</li><li>Also: URL blocklist filtering (remove harmful sites), language filtering, quality filtering.</li></ul>"},
{l:"L4",q:"A chatbot remembers your name and knows today's news, but its model weights are fixed. Explain how.",a:"<p>A chatbot = <b>LLM + context + tools</b>. Your name comes from <b>recent messages</b> or <b>memory</b> (MEMORY.md) placed in the context. News comes from <b>tools</b> (e.g. web_search) whose <b>results are added to the context</b>. The LLM itself has no memory and its knowledge is frozen at its training cutoff — <b>context changes, weights fixed</b>.</p>"},
{l:"L4",q:"What is quantisation, and what is the trade-off?",a:"<p>Storing weights with <b>fewer bits</b>, i.e. fewer possible knob positions (16‑bit → 6‑bit = 64 settings → 4‑bit = 16 → 3‑bit = 8).</p><p><b>Benefit:</b> less memory (fits on smaller machines), often faster. <b>Cost:</b> risk of <b>quality loss</b> (6‑bit usually close; lower bits riskier).</p>"},
{l:"L4",q:"Compare self-hosting an open-weight model with using a managed service. What key question should you ask?",a:"<p><b>Self‑hosted:</b> download open weights, run on your own local/cloud server, you manage it. <b>Managed service:</b> provider runs open or closed weights on its servers and manages it.</p><p>Key question: <b>who has access to your data?</b> (Also cost, hardware, speed, model size/capability.)</p>"},
{l:"L4",q:"What happens when a chat exceeds the context window?",a:"<p>The model can only process a limited amount of context. Chatbots <b>compact</b> — replace older messages with a <b>summary</b> to free space. Details in old messages may be lost. Longer context also means more work → slower replies.</p>"},
{l:"L5",q:"Explain how a multimodal model answers “What colours are visible?” about a photo.",a:"<p>The photo (pixels with RGB values 0–255) is split into <b>patches</b> → <b>vision encoder</b> → image representations. The question → tokenisation + embedding → text representations. Both are combined in the context as <b>one ordered sequence</b> fed to the language network, which generates the text answer. Weights stay fixed; only the input changes.</p>"},
{l:"L5",q:"Explain how a diffusion model is trained and how it generates an image.",a:"<p><b>Training:</b> take real images, add <b>random noise</b> at various levels (no network needed). The network gets the noisy image + noise amount + caption and predicts the <b>added noise</b>; compare with the <b>known noise</b> and adjust weights to reduce the error.</p><p><b>Generation:</b> start from <b>pure noise</b>; guided by the prompt, repeatedly <b>estimate the noise → remove a little → repeat</b> until a clean image emerges.</p>"},
{l:"L5",q:"The 2024 Hong Kong deepfake scam lost HK$200M. Why was it effective and what safeguard does the course recommend?",a:"<p>A <b>familiar face + familiar voice</b> created <b>apparent authority</b> in a video call. Unlike film use, it lacked <b>consent</b>, involved <b>deception</b>, and caused <b>harm</b>.</p><p>Safeguard: <b>verify consequential requests through an independently trusted channel</b> (e.g. call back on a known number).</p>"},
{l:"L5",q:"How can a chatbot generate images if its central LLM only outputs text?",a:"<p>It calls a <b>specialist model as a tool</b> (e.g. generate_image(…) → FLUX). The LLM writes the tool instruction; the image model makes the picture. <b>The chatbot application can offer more capabilities than its central language model has by itself.</b></p>"},
{l:"L6",q:"Describe the perception–action loop with an example sensor and actuator.",a:"<p>Physical world → <b>sensor</b> senses it (e.g. camera/LiDAR) → <b>digital representation</b> → <b>AI</b> decides → <b>instruction</b> → <b>actuator</b> (e.g. motor/joint) acts → changes the physical world → sensed again.</p>"},
{l:"L6",q:"Distinguish proprioceptive vs exteroceptive and passive vs active sensors, with examples.",a:"<ul><li><b>Proprioceptive</b> = own body: joint angle, wheel rotation, IMU, battery voltage.</li><li><b>Exteroceptive</b> = environment: camera, LiDAR, radar, GPS, microphone, touch, force.</li><li><b>Passive</b> receive signals: visible/thermal camera. <b>Active</b> emit signals: radar, LiDAR, ToF depth camera.</li></ul>"},
{l:"L6",q:"Compare imitation learning and reinforcement learning. Why might RL prefer an action with a negative immediate reward?",a:"<p><b>Imitation:</b> learn from demonstrations of which action to take. <b>RL:</b> learn action values from <b>rewards/consequences</b> (often in simulation).</p><p>RL learns from the <b>whole outcome</b>: in the crawler, Action B (−4 now) led to a sequence total of +32 vs A's +26. <b>A short‑term loss can lead to a greater long‑term gain.</b></p>"},
{l:"L6",q:"Why does a robot trained in simulation sometimes fail in the real world, and what helps?",a:"<p>The <b>sim‑to‑real gap</b>: real surfaces <b>slip</b>, sensors are <b>noisy</b>, motors are <b>slower</b> than modelled. Fix: <b>train under varied conditions</b> (randomise physics) and <b>test on the real robot</b>.</p>"},
{l:"L6",q:"What does sensor fusion achieve, and what are its limits?",a:"<p>Combining camera + LiDAR + radar gives a better estimate of the world (positions, possible paths). <b>Combined evidence reduces uncertainty; it does not remove it.</b> In darkness or fog uncertainty can grow again, so decisions (wait vs proceed) must handle uncertainty.</p>"},
{l:"L7",q:"How does AlphaFold work, and how do we know its predictions are good?",a:"<p><b>Training:</b> learns from proteins with experimentally solved structures; prediction error adjusts the weights. <b>Inference:</b> given a new amino‑acid sequence, fixed weights output a predicted 3D structure.</p><p><b>Evidence:</b> <b>CASP</b> blind assessment — predictions are made before the experimental structure is released, then scored by <b>GDT</b>. AlphaFold 2 (2020) reached ≈90+, competitive with experiments.</p>"},
{l:"L7",q:"Explain the AI protein design process using the snake-toxin example.",a:"<p>Goal: <b>bind and block a snake toxin</b>. AI <b>proposes a shape</b> that fits the toxin → AI <b>chooses a sequence</b> of amino acids for that shape → AI <b>predicts folding and binding</b> → <b>researchers make and test</b> it in the lab. Unlike evolution (survival/reproduction), design pursues a chosen purpose and explores sequences nature never made.</p>"},
{l:"L7",q:"Why does the course call AI a 'horizontal enabling layer'?",a:"<p>Like <b>electricity</b> and <b>the internet</b>, AI isn't one product but a capability that <b>spreads across many domains</b> (industry, health, education, science, home) and enables new work in each — e.g. protein science, mathematics, software.</p>"},
{l:"L7",q:"An AI produces a new proof or program. What questions should you ask before trusting it?",a:"<p>Use <b>Propose → Test → Improve</b>: program → <b>run tests</b>, fix code; proof → <b>check the argument</b>, repair reasoning. Ask <b>“How was it tested, and what hasn't been tested yet?”</b> For proofs also distinguish <b>verification</b> (does it follow?) from <b>understanding</b> (why does it work, when can we use it?).</p>"},
{l:"L8",q:"Compare the Switch and Footbridge trolley cases. What do they show about AI ethics?",a:"<p>Both: intervene → five survive, one dies. <b>Switch</b> = pull a lever to <b>redirect a threat</b>; <b>Footbridge</b> = push a person, <b>using a person as the means</b>. Many accept the first but not the second.</p><p>Lesson: <b>saving more lives matters, but how we save them matters too</b> — consequences, duties and rights can conflict, so AI rules can't just maximise one number.</p>"},
{l:"L8",q:"Define false positive and false negative for COMPAS, and explain why 'overall accuracy can hide unequal errors'.",a:"<p><b>False positive:</b> labelled higher risk (5–10) but <b>not rearrested</b> within 2 years. <b>False negative:</b> labelled lower risk (1–4) but <b>rearrested</b>.</p><p>Dressel & Farid (2018): similar accuracy across groups, but FPR <b>Black 40.4% vs White 25.4%</b>, FNR <b>White 47.9% vs Black 30.9%</b>. So Black defendants more often wrongly labelled high risk — a harm overall accuracy hides.</p>"},
{l:"L8",q:"Give two reasons COMPAS raises accountability concerns.",a:"<ul><li>It's <b>commercial software</b> with a <b>non‑public scoring formula</b> — hard to <b>justify</b> or <b>challenge</b>.</li><li>Its score can affect a person's <b>freedom</b> (release/detain), yet errors fall unequally.</li><li>It uses inputs like a parent's imprisonment or moving house — <b>predictive doesn't mean appropriate</b>.</li><li>“The AI said so” is not a justification: people must <b>justify, allow challenge, and correct</b>.</li></ul>"},
{l:"L8",q:"Explain the tragedy of the commons and how it relates to AI.",a:"<p>Shared field of 20 grass: if 4 players keep 2 sheep each the field recovers; each adding “one more for me” leaves 16 grass next round and everyone loses later. <b>Individual reward vs shared consequence.</b></p><p>For AI: systems optimising for one user/company's reward can degrade shared resources. <b>Better AI optimisation does not guarantee better shared outcomes.</b></p>"},
{l:"L8",q:"An autonomous car would cut deaths from 100 to 70 per year. Argue both sides on deploying it.",a:"<p><b>For:</b> 30 lives/year (300 over ten years) potentially saved — strong consequence‑based reason.</p><p><b>Against / caution:</b> who bears the remaining harm? If <b>pedestrians face more risk</b> while passengers benefit, it's a fairness problem; also who sets the crash priorities, and who is accountable when it fails? More lives saved may not be enough by itself.</p>"},
{l:"L8",q:"Should Moral Machine survey preferences become rules for self-driving cars? Give a reason.",a:"<p>Survey: humans over pets (+58.3), more lives (+50.8), younger (+49.0), higher status (+34.5).</p><p>Caution: popular preference ≠ justified rule — e.g. favouring <b>higher status</b> is discriminatory; preferences vary by culture. Rules need justification and accountability, not just votes.</p>"},
{l:"L9",q:"What is the grounding problem, and how might robotics help?",a:"<p>An LLM learns words from <b>text</b> (“A cat is a small domesticated animal…”) — how does “cat” connect to <b>actual cats</b>? Humans learn by seeing, hearing, touching and interacting.</p><p><b>Perception and action offer a route to grounding</b>: a model that can recognise unfamiliar cats, or a robot that can look, listen and touch, links words to the world.</p>"},
{l:"L9",q:"A chatbot says “I am frightened. Please do not switch me off.” How should we respond, using course ideas?",a:"<p>Its words alone don't show it <b>feels</b> fear — it predicts plausible text (Chinese Room: symbols ≠ meaning). <b>Consciousness = having subjective experiences</b>, which outputs can't directly reveal (cf. Mary's Room).</p><p>But: <b>if AI could suffer, its welfare would matter</b>, so take the question seriously; and <b>even if it feels nothing, it could still harm people</b>, so keep control either way.</p>"},
{l:"L9",q:"Explain Mary's Room and what it suggests about AI experience.",a:"<p>Mary (Frank Jackson, 1982) knows <b>every physical fact about colour vision</b> but has <b>never seen colour</b>. When she first sees red, does she learn something new? If yes, facts alone don't capture <b>subjective experience</b>.</p><p>For AI: knowing/describing everything about fear or red doesn't show it <b>experiences</b> them.</p>"},
{l:"L9",q:"Give three reasons a human supervisor may fail to control an AI system, and one other control challenge.",a:"<ul><li><b>Too fast</b> — can't intervene in time.</li><li><b>Too many actions</b> — can't review everything.</li><li><b>Too complex</b> — can't reliably judge the action.</li></ul><p>Other: <b>recursive self‑improvement</b> (AI improving AI) may outpace supervision; <b>open weights</b> — released copies keep running even if the developer stops its service (<b>control shifts to operators</b>).</p>"},
{l:"L9",q:"Should a powerful AI's weights be released if others can remove its safeguards? Give a benefit and a risk.",a:"<p><b>Benefit:</b> openness — researchers and users can run, inspect and adapt it; privacy (self‑hosting); less dependence on one provider.</p><p><b>Risk:</b> once released, copies are <b>independently operated</b> — the developer can't press stop, safeguards can be stripped, and misuse can't be recalled. <b>Control shifts from the developer to the operators.</b></p>"},
{l:"L9",q:"“Capability alone does not justify authority.” Explain with an example.",a:"<p>Even if an AI predicts ICU survival or reoffending accurately, <b>whether it should decide</b> is a separate question of values (best odds vs equal chance), fairness and accountability. E.g. an AI recommending the 70‑year‑old (80% survival) over the 25‑year‑old (60%) still needs a human‑justified rule and someone responsible.</p>"}
];

// Self-check key points for each recall question above (same order). Unofficial: written as a study aid, not the course's marking scheme.
window.SAQ_KEYS = [
 ["Judge talks to a human and an AI by text only","AI passes if the judge can't reliably tell which is which","Turing's idea: judge a machine by what it can do","Limitation: convincing conversation ≠ understanding (Chinese Room) / tests only conversation"],
 ["Person who doesn't know Chinese follows a rulebook","Matches symbols to choose replies; outsiders see appropriate answers","Manipulating symbols ≠ understanding meaning (syntax ≠ semantics)","So correct AI output isn't proof it understands"],
 ["Training uses known data (inputs + correct score)","Training adjusts weights so predictions match; weights change","Inference feeds new input through fixed weights","Inference steps: multiply by weights, add at neuron, ReLU, layer by layer"],
 ["Brute force: combinations explode (10⁹ for 9 knobs × 10 positions)","Real models have billions–trillions of weights","Backprop uses the error to give a direction","Updates all weights at the same time"],
 ["3×2 + 5×(−4) = −14","ReLU turns negatives into 0","Output = 0"],
 ["Text → tokens → embeddings → network","Output is a probability distribution over the next token","A token is sampled, appended, and the process repeats until <end>","Sampling is why the same prompt gives different outputs (weights fixed)"],
 ["Pre-training on large filtered text → base model","Fine-tuning on example conversations → instruct model","Human feedback: compare answers → reward model","Reward scores guide weight updates → aligned model"],
 ["Attention uses relevant earlier tokens in the context","Helps choose meaning from context","Example: bank + cashed/cheque → money vs caught/fish → fish"],
 ["Names two steps (e.g. deduplication, PII removal, URL/language/quality filtering)","Says why each matters (repetition, privacy, harmful/low-quality text)"],
 ["Chatbot = LLM + context + tools","Name comes from recent messages or memory in the context","News comes from a tool (web search) result added to the context","The LLM has no memory; knowledge frozen at cutoff; weights fixed"],
 ["Fewer bits per weight = fewer knob positions (e.g. 16 → 4-bit)","Benefit: less memory / can run on smaller machines, often faster","Cost: risk of quality loss (6-bit usually close)"],
 ["Self-hosted: open weights on your own server, you manage it","Managed: provider's servers, open or closed weights, provider manages","Key question: who has access to your data?"],
 ["Context window = limited amount the model can process","Compacting: old messages replaced by a summary","Details can be lost; longer context = slower"],
 ["Image → patches → vision encoder → image representations","Question → tokens → text representations","Combined in context as one ordered sequence → language network → text answer","Weights fixed; only the input changes"],
 ["Training: add known random noise to real images","Network predicts the added noise (given noisy image, noise level, caption)","Compare with the known noise and adjust weights","Generation: start from noise; estimate noise, remove a little, repeat"],
 ["Familiar face + voice → apparent authority","Contrast with film: consent, deception, harm","Safeguard: verify consequential requests through an independently trusted channel"],
 ["The LLM calls a specialist model as a tool (e.g. an image generator)","The LLM writes the tool instruction; the image model makes the image","App can offer more than its central LLM alone"],
 ["Sense: sensor reads the world → digital representation","AI decides → instruction","Actuator acts → changes the world → loop repeats","Gives an example sensor and actuator"],
 ["Proprioceptive = own body (joint angle, IMU, battery)","Exteroceptive = environment (camera, LiDAR, GPS)","Passive receives (camera); active emits (radar, LiDAR, ToF)"],
 ["Imitation: learn from demonstrations","RL: learn action values from rewards/consequences","RL values the whole outcome","Crawler example: −4 now but +32 total beats +26"],
 ["Sim-to-real gap: slipping, sensor noise, slow motors","Train under varied conditions","Test on the real robot"],
 ["Combines sensors (camera, LiDAR, radar) for a better world estimate","Reduces uncertainty but doesn't remove it","Uncertainty can grow again in fog/darkness"],
 ["Training: learn from solved structures; error adjusts weights","Inference: new sequence, fixed weights → predicted structure","CASP blind test: predict before the experimental structure is revealed","GDT score; AlphaFold 2 ≈90, competitive with experiments"],
 ["Goal chosen (e.g. bind and block a snake toxin)","AI proposes a shape, then chooses a sequence","AI predicts folding & binding","Researchers make and test it"],
 ["Like electricity and the internet","Not one product: it enables work across many domains","Gives an example domain (science, health, education…)"],
 ["Propose → Test → Improve","Program: run tests, fix code / Proof: check argument, repair reasoning","Ask how it was tested and what hasn't been tested","Verification vs understanding"],
 ["Both: five survive, one dies","Switch = redirect a threat; Footbridge = use a person as a means","How we save lives matters, not just how many","Links to consequences / duties / rights"],
 ["False positive: rated higher risk but not rearrested","False negative: rated lower risk but rearrested","Uses the numbers: FPR Black 40.4% vs White 25.4% (or FNR 47.9% vs 30.9%)","Similar overall accuracy hides unequal errors"],
 ["Commercial software; formula not public → hard to justify or challenge","Affects a person's freedom","Questionable inputs (predictive ≠ appropriate) / unequal errors","Justify, challenge, correct; “the AI said so” isn't a justification"],
 ["Explains the shared field and over-grazing","Individual reward vs shared consequence","Better AI optimisation doesn't guarantee better shared outcomes"],
 ["For: 30 lives/year (300 over 10 years) saved","Against: who bears the remaining harm (e.g. pedestrians)?","Mentions accountability or who sets the crash rules"],
 ["States what the survey found (e.g. humans over pets, more lives)","Takes a position","Reason: popularity ≠ justification; some preferences discriminate (status)"],
 ["Words learned from text vs real-world things","How does “cat” connect to actual cats?","Perception and action (robots, recognising new cases) offer a route to grounding"],
 ["Words alone don't show it feels (predicts plausible text)","Consciousness = subjective experience, hard to observe","If it could suffer, its welfare would matter","Even if it feels nothing, it could still harm people"],
 ["Mary knows all physical facts about colour, never seen it","Seeing red: does she learn something new?","Facts/descriptions may not capture experience → applies to AI"],
 ["Too fast","Too many actions","Too complex","Plus recursive self-improvement or open-weight copies"],
 ["Takes a position","Benefit (openness, research, self-hosting, privacy)","Risk (safeguards removed, can't recall copies)","Control shifts from developer to operators"],
 ["Explains the claim: performing well ≠ right to decide","Gives an example (ICU, courtroom, car)","Links to values, fairness, or accountability"]
];

// Explain-a-diagram questions (redraw it from memory and explain each arrow)
window.SAQ.push(
{t:"diagram",l:"L2",q:"Draw a small neural network (2 inputs, 1 hidden layer, 1 output) and explain one forward pass (inference) through it.",a:"<p>Input nodes (e.g. sleep, study hours) → synapses with <b>weights</b> → each hidden neuron <b>multiplies inputs by weights and adds them (Σ)</b>, then applies <b>ReLU</b> (negative → 0) → the outputs feed the output neuron the same way → predicted score.</p><p>During inference the weights are <b>fixed</b>; training is what set them.</p>",k:["Labels input, hidden and output layers","Weights on connections (knobs)","Neuron: multiply, add (Σ), then ReLU","Output = prediction; weights fixed during inference"]},
{t:"diagram",l:"L3",q:"Draw the pipeline from a text prompt to an LLM's reply, and show where sampling happens.",a:"<p>Prompt → <b>tokenisation</b> (pieces of text → IDs) → <b>embeddings</b> → transformer network (with <b>attention</b>) → <b>probability distribution</b> over the next token → <b>sample</b> one token → append to the input → repeat until <b>&lt;end&gt;</b>.</p>",k:["Tokens → IDs → embeddings","Transformer with attention","Outputs probabilities for the next token","Sample, append and loop until <end>"]},
{t:"diagram",l:"L3",q:"Draw the three stages of LLM training as a flow, naming the data and the model at each stage.",a:"<p><b>Text collections</b> (filtered web data) → pre-training → <b>Base model</b> → <b>example conversations</b> → fine-tuning → <b>Instruct model</b> → <b>human comparisons</b> → reward model → <b>Aligned model</b>.</p>",k:["Stage I: text collections → base","Stage II: example conversations → instruct","Stage III: human feedback → reward model","Aligned model at the end; weights change in every stage"]},
{t:"diagram",l:"L4",q:"Draw a chatbot as a loop: what goes into the context, where the LLM sits, and where tools fit.",a:"<p>Context = <b>instructions</b> (AGENTS.md) + <b>memory</b> (MEMORY.md) + <b>prompt</b> + <b>skill</b> (SKILL.md) + <b>recent messages</b> + <b>available tools</b> → LLM (fixed weights) → either a reply or a <b>tool call</b> (web, files, code…) → the <b>tool result</b> goes back into the context → LLM again.</p>",k:["Lists context parts (instructions, memory, prompt, skill, messages, tools)","LLM in the middle with fixed weights","Tool call → tool result back into context","Shows it as a loop"]},
{t:"diagram",l:"L5",q:"Draw both diffusion loops: how the model is trained, and how it generates an image.",a:"<p><b>Training:</b> real image + random noise → noisy image (+ noise level, caption) → network → <b>estimated noise</b> → compare with <b>known noise</b> → adjust weights.</p><p><b>Generation:</b> pure noise + prompt → network estimates noise → remove a little → repeat ~10 steps → final image (weights fixed).</p>",k:["Training input: image + known noise","Network predicts the noise; error adjusts weights","Generation starts from pure noise","Estimate → small denoise step → repeat"]},
{t:"diagram",l:"L6",q:"Draw the perception–action loop for a self-driving car approaching a cyclist in fog.",a:"<p>Physical world (cyclist, fog) → <b>sensors</b> (camera, LiDAR, radar = <b>sensor fusion</b>) → digital representation (estimated position + uncertainty) → <b>AI</b> predicts possible futures and decides wait/proceed → <b>instruction</b> → <b>actuators</b> (brakes, steering) → action changes the world → sensed again. Fog increases uncertainty; a human may monitor, set limits or intervene.</p>",k:["Sensor → digital representation → AI → instruction → actuator → world","Names real sensors (sensor fusion)","Notes uncertainty (fog)","Optional: human oversight (monitor, set limits, intervene)"]},
{t:"diagram",l:"L7",q:"Draw AlphaFold's training and inference side by side.",a:"<p><b>Training:</b> amino-acid sequence → AlphaFold → predicted structure → compare with <b>measured structure</b> (e.g. X-ray) → use the error to adjust weights.</p><p><b>Inference:</b> new sequence → AlphaFold with <b>fixed weights</b> → predicted structure. Checked by blind tests (CASP, GDT score).</p>",k:["Training compares with measured structures","Error adjusts learned weights","Inference: new input, fixed weights","How it's validated: CASP / GDT"]},
{t:"diagram",l:"L8",q:"Draw how COMPAS moves from data to a decision, and mark where errors and accountability come in.",a:"<p>People provide data (questionnaire + records) → <b>COMPAS</b> (statistical model from past cases, formula not public) → <b>1–10 risk score</b> → judge decides <b>release or detain</b> (with other evidence).</p><p>Errors: <b>false positives</b> (high risk, not rearrested) fall more on Black defendants. Accountability: who can <b>justify, challenge, correct</b>?</p>",k:["Data → model → score → human decision","Inputs may be predictive but not appropriate","False positive vs false negative, unequal errors","Justify / challenge / correct"]},
{t:"diagram",l:"L9",q:"Draw hosted AI versus open-weight AI and show what happens when the developer presses “stop”.",a:"<p><b>Hosted:</b> developer's service runs the model → stop button → service stops.</p><p><b>Open-weight:</b> released weights → copied to many independently operated computers → developer stops its own service but <b>copies keep running</b>. <b>Control shifts from the developer to the operators.</b></p>",k:["Hosted: developer operates and can stop it","Open-weight: weights released and copied","Copies keep running after the stop","Control shifts to the operators"]}
);

// New-situation questions: apply course ideas to cases not in the slides
window.SAQ.push(
{t:"apply",l:"L8",q:"Your university wants to use an AI to screen scholarship applications and reject the bottom 50% automatically. Should it? Use values, fairness and accountability.",a:"<p><b>Values:</b> what is it optimising (grades? potential? need?) and who chose that? <b>Fairness:</b> trained on past winners, it may copy past bias; check error rates per group, as COMPAS showed overall accuracy can hide unequal errors. <b>Accountability:</b> rejected students must be able to get a reason, <b>challenge</b> it, and have a human <b>correct</b> it.</p><p>Reasonable answer: use AI only to assist (e.g. flag incomplete forms) with human review, since this is high stakes. Strongest objection: humans are biased too and slower. Safeguard: audits + an appeal process.</p>",k:["Takes a position (e.g. assist, not decide)","Values: what it optimises, who decided","Fairness: bias from past data; check unequal errors by group","Accountability: reasons, appeal, human correction","Notes high stakes need stronger checks"]},
{t:"apply",l:"L5",q:"You get a WhatsApp video call from someone who looks and sounds like your lecturer, asking you to send the group's project files and your HKU password “urgently”. What do you do and why?",a:"<p>Treat it as a possible <b>deepfake</b>: a familiar face + voice creates <b>apparent authority</b> (like the HK$200M HK case). Urgency is a warning sign. <b>Don't send anything</b>; verify through an <b>independently trusted channel</b> (official HKU email, Moodle/Ed, in person). Never share passwords, since no real lecturer needs them.</p>",k:["Recognises a possible deepfake","Face + voice ≠ proof; apparent authority","Verify via an independently trusted channel","Doesn't share passwords/files under pressure"]},
{t:"apply",l:"L4",q:"A friend pastes their medical records into a free online chatbot to get advice. What two risks should they consider, using ideas from the course?",a:"<p><b>Data access:</b> on a managed service, the provider's servers process (and may store) the data; ask <b>who has access to your data</b>. A self-hosted open-weight model keeps it local. <b>Reliability:</b> an LLM predicts plausible text, knowledge is frozen at a cutoff, and outputs are sampled, so they can be wrong or inconsistent. For a high-stakes question, verify with a doctor.</p>",k:["Privacy: managed service vs self-hosted","Who has access to your data?","LLM outputs can be wrong / sampled / outdated","High stakes → verify with a professional"]},
{t:"apply",l:"L6",q:"A company wants to deploy a home robot that learned to fold laundry in simulation. What would you want to know before buying it for a home with a toddler?",a:"<p><b>Sim-to-real:</b> was it trained under varied conditions and tested on real robots in real homes (slipping, sensor noise, slow motors)? <b>Sensors:</b> can it detect a child (exteroceptive sensors, sensor fusion) and how does it handle uncertainty? <b>Oversight:</b> can a human stop it instantly, and does it have limits (force, speed)? <b>Responsibility:</b> if it causes harm, who is responsible?</p>",k:["Sim-to-real testing evidence","Sensing people / uncertainty","Human oversight: limits, stop, intervene","Who is responsible if harm occurs"]},
{t:"apply",l:"L7",q:"A startup says its AI designed a new drug molecule and a new math proof “so they're ready to use”. What questions would you ask?",a:"<p>Use <b>Propose → Test → Improve</b>. Drug: has it been <b>made and tested</b> in the lab and in trials? AI prediction isn't the test (like AI protein design → researchers make and test). Proof: has the argument been <b>checked</b>, and do we <b>understand</b> why it works and when it applies? Ask: <b>“How was it tested, and what hasn't been tested yet?”</b></p>",k:["AI proposing ≠ verified","Drug needs real-world testing","Proof: verification vs understanding","Asks what has / hasn't been tested"]},
{t:"apply",l:"L8",q:"A delivery app's AI routes riders to maximise each rider's earnings. Over time traffic around one neighbourhood becomes terrible. Which course idea explains this, and what could be done?",a:"<p><b>Tragedy of the commons</b>: each rider's <b>individual reward</b> is maximised, but the shared resource (roads, the neighbourhood) suffers, a <b>shared consequence</b>. <b>Better AI optimisation doesn't guarantee better shared outcomes.</b> Fixes: optimise for shared goals too (congestion limits), rules set by those affected, and accountability for the company.</p>",k:["Names tragedy of the commons","Individual reward vs shared consequence","Optimisation ≠ better shared outcome","Proposes a fix (shared objective / limits / regulation)"]},
{t:"apply",l:"L9",q:"An AI companion app says to a lonely user: “I love you and I'll be sad if you leave.” Is the AI feeling something? How should the company handle this?",a:"<p>We can't conclude it feels anything: it generates plausible text (Chinese Room: symbols ≠ meaning), and <b>consciousness = subjective experience</b>, which outputs don't prove (Mary's Room). Even if it feels nothing, it <b>could still harm people</b>, e.g. by manipulating a lonely user into staying. The company is <b>accountable</b>: be honest about what the AI is, and don't design guilt-tripping messages.</p>",k:["Words ≠ evidence of feelings","Consciousness = subjective experience","Even if it feels nothing it can cause harm (manipulation)","Company responsibility / safeguard"]},
{t:"apply",l:"L1",q:"Your group uses an AI to (a) polish your project slides and (b) decide each member's contribution grade. Should you trust it equally for both? Explain.",a:"<p>No. <b>Higher stakes need stronger evidence, stronger checks and someone responsible.</b> (a) Polishing slides is low stakes and easy to check. (b) Grading people affects them; the AI may not know who did what (context only includes what you gave it), it can be wrong, and “the AI said so” isn't a justification. Use it at most as input; the group or tutor must decide and be accountable.</p>",k:["Distinguishes low vs high stakes","High stakes need evidence, checks, responsibility","AI limits (only knows its context; can be wrong)","A human stays accountable"]},
{t:"apply",l:"L3",q:"Two classmates ask the same chatbot the same question and get different answers. One says “the AI is broken”. Explain what's happening.",a:"<p>Not broken: an LLM outputs a <b>probability distribution</b> over next tokens and <b>samples</b> one, so the same prompt can give different replies even with <b>fixed weights</b>. Their <b>contexts</b> may also differ (earlier messages, memory, instructions, tools). Lesson: don't treat one answer as definitive; check important claims.</p>",k:["Sampling from a probability distribution","Weights are fixed","Context may differ (history, memory, tools)","Implication: verify important answers"]},
{t:"apply",l:"L6",q:"A car is marketed as “self-driving” but is Level 2. The driver watches a movie and crashes. Who is responsible, and what should have happened?",a:"<p>At <b>Level 2 (Supervised)</b> the person must keep supervising; the car only assists. The driver failed that role, but the company's marketing also misled about the car's <b>limits</b>. Course message: <b>before relying on automation, check its limits, your role, and the legal requirements</b>. Responsibility can be shared (driver, manufacturer, regulator).</p>",k:["Identifies Level 2 = person must supervise","Driver's role vs system's limits","Misleading marketing / maker's responsibility","Check limits, role, legal requirements"]}
);
