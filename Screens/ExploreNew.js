import React, { useEffect, useState } from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button, useWindowDimensions, ScrollView, Image, Touchable, Platform } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getAuth, signInWithCredential, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import app from '../firebaseConfig';
import useRevHook from '../Components/useRevHook';
import analytics from '@react-native-firebase/analytics';
import { useAuth } from '../Context/AuthContext';

export default function ExploreNew({navigation, route}) {
    const {isFleur, setIsFleur} = useAuth()
    const {firstLogin} = useAuth()
    const {width, height} = useWindowDimensions()
    const db = getDatabase()
    const auth = getAuth(app)
    const {isProMember} = useRevHook()

   useEffect(()=> {
    setIsFleur(false)
   }, [])

    const nat = [
        {point:"I'm such a failure"},
        {point:"No one likes me"},
        {point:"Everyone is going to hurt me"}
    ]

    const partmodelItems =[
        {point: "The situation itself"},
        {point: "Your thoughts"},
        {point:"Your emotions/feelings"},
        {point:"Your behaviours"},
        {point:"Your physical sensations/response"}
    ]

    const groundingItems = [
       {point:  "Breathing"},
        {point: "Chewing gum"},
        {point:"Holding a warm cup"},
        {point:"Essentials oils (or other scents)"},
        {point:"Running your hands under cold water"},
        {point:"Hugging a pillow"},
        {point:"Stretching your body"},
        {point:"Listening to your surroundings"},
        {point:"Re-orienting yourself:"},
       
        {point:"Describe your surroundings"},
        {point:"Have a grounding object"},
        {point:"Listen to music"}
    ]

    const groudingSubItems = [
        {point:"Where are you?"},
        {point:"What time is it?"},
        {point:"What day of the week is it?"},
        {point:"What is the date?"},
        {point:"Who are you with?"},
    ]

    const gettingStarted = [
        {
            title: "Reduce Stress and Boost Your Mood: Grounding", 
            eventName:"article_Grounding",
            descriptionShort:"Discover the benefits of grounding for mental health: Techniques to bring focus to the present moment.", 
            content: 
            <View>
            <Text style={tw`text-white mx-2 text-2xl `}>What Is Grounding?</Text>
            
            <Text style={tw`text-white mx-2 text-lg`}>
            Grounding is a technique used in mental health to bring an individual's focus back to the present moment and away from overwhelming thoughts, feelings, or sensations. This technique can be particularly helpful for individuals experiencing anxiety, panic attacks, dissociation, or other forms of emotional distress.
            </Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            Grounding is based on the idea that by connecting with our physical sensations, we can anchor ourselves in the present moment and reduce the impact of negative emotions or thoughts. There are many different grounding techniques, and the most effective one will depend on the individual's preferences and the specific situation.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl my-3`}> The 5-4-3-2-1 Method</Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            One of the most common grounding techniques is the 5-4-3-2-1 method. This involves identifying five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste. This technique helps to bring an individual's focus back to their physical sensations and to the present moment.
            </Text>
            
            <Text style={tw`text-white mx-2 text-2xl my-3`}> Deep Breathing</Text>
            <Text style={tw`text-white mx-2 text-lg`}>
            Another grounding technique is deep breathing. This involves taking slow, deep breaths, focusing on the sensation of the breath moving in and out of your body. Deep breathing can help to reduce stress and anxiety and to bring an individual's focus back to the present moment.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl my-3`}>Progressive Muscle Relaxation</Text>
            <Text style={tw`text-white mx-2 text-lg`}>
            Still, another grounding technique is progressive muscle relaxation. This involves tensing and relaxing different muscle groups in a systematic manner, starting with the feet and working up to the head. This technique can help to reduce physical tension and to calm the mind.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl my-3`}>You Can Do It Anywhere</Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            Grounding techniques can be used in any situation, whether at home, work, or in public. They can be particularly helpful when an individual is feeling overwhelmed or panicked, as they provide a simple and effective way to regain control and reduce emotional distress.
            </Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            In conclusion, grounding is a useful tool for anyone looking to manage their mental health and well-being. Whether you are dealing with anxiety, panic attacks, dissociation, or other forms of emotional distress, grounding can help to bring you back to the present moment and reduce the impact of negative thoughts and feelings. By incorporating grounding into your daily routine, you can achieve a greater sense of calm and well-being, even in challenging situations.





            </Text>

          
          </View>
            
            ,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/grounding.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/grounding.jpg')} />
        },
        {
            title: "CBT's 5 Part Model: The Ultimate Mental Health Toolkit You Need to Know", 
            eventName:"article_CBT",
            descriptionShort:"Learn how Cognitive Behavioral Therapy can help rewire our thinking patterns.", 
            content:
            <View>
            <Text style={tw`text-white mx-2 text-2xl `}>What is CBT:</Text>
            
            <Text style={tw`text-white mx-2 text-lg`}>
            Cognitive-behavioral therapy (CBT) is a type of psychotherapy that has been shown to be effective in treating a wide range of mental health conditions, including anxiety and depression. CBT is based on the idea that our thoughts, feelings, and behaviors are interconnected and that changing one aspect of this system can lead to changes in the others. The CBT model is often described as having five parts: assessment, goal setting, education, skills training, and generalization and maintenance.
            </Text>
           
            <Text style={tw`text-white mx-2 text-2xl mt-2 `}>Step 1: Assessment</Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            The first step in CBT is assessment, where the therapist works with the individual to understand their specific difficulties and to develop a treatment plan. This often involves a thorough evaluation of their thoughts, feelings, and behaviors and the impact these have on their daily life.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl mt-2 `}>Step 2: Goal Setting</Text>
            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            The second step is goal setting, where the therapist and individual work together to identify specific, achievable goals for treatment. These goals may include reducing anxiety, improving mood, or changing unhelpful thinking patterns.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl mt-2 `}>Step 3: Education</Text>
            
            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            The third step is education, where the therapist provides the individual with information about their condition and the CBT model. This may include an explanation of how thoughts, feelings, and behaviors are connected and how changing one aspect of this system can lead to changes in the others.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl mt-2`}>Step 4: Skills Training</Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            The fourth step is skills training, where the therapist works with the individual to develop new coping skills and strategies for managing their thoughts, feelings, and behaviors. This may involve practicing relaxation techniques, challenging unhelpful thoughts, and developing new, positive habits.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl mt-2`}>Step 5: Generalization</Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            Finally, the fifth step is generalization and maintenance, where the therapist helps the individual apply what they have learned in therapy to their daily life and maintain their gains over time. This may involve developing a plan for managing triggers, identifying potential roadblocks, and developing a support system to help maintain their progress.
            </Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            CBT has been shown to be effective in a wide range of studies and has been found to be particularly helpful for individuals with depression, anxiety, and other mental health conditions. It is a relatively short-term treatment, with many people reporting improvement in as little as 10-20 sessions. CBT is a flexible and adaptable treatment approach and can be tailored to meet the specific needs of each individual.
            </Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            In conclusion, CBT is a highly effective treatment approach for a wide range of mental health conditions. The five-part CBT model provides a structured and systematic approach to treatment and has been shown to be effective in helping individuals to overcome their difficulties and achieve their goals. Whether you are seeking treatment for yourself or for a loved one, understanding the CBT model is a valuable step towards improving mental health and well-being.
            </Text>

            

          
          </View>,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/5part.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/5part.jpg')} />
        },
        {
            title: "Negative Automatic Thoughts: A Hidden Culprit Behind Anxiety and Depression", 
            eventName:"article_NAT",
            descriptionShort:"Learn how depression and anxiety can be understood via looping automatic thoughts and what you can do about it.", 
            content: 
            <View>
            <Text style={tw`text-white mx-2 text-2xl `}>What Are Negative Automatic Thoughts?</Text>
            
            <Text style={tw`text-white mx-2 text-lg`}>
            Negative automatic thoughts (NATs) are negative, self-defeating thoughts that arise spontaneously in response to life events or situations. These thoughts are often so automatic and unconscious that individuals may not even be aware of them. NATs can take many forms, including self-criticism, self-doubt, and fear of failure. These thoughts can be particularly damaging to mental health and well-being, as they can lead to feelings of anxiety, depression, and low self-esteem.
            </Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            NATs are rooted in our beliefs and attitudes, and are often developed early in life through experiences and messages from others. Over time, these negative thoughts can become deeply ingrained, leading to negative patterns of thinking that can be difficult to change.
            </Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            The good news is that negative automatic thoughts can be managed and changed through a variety of approaches, including cognitive-behavioral therapy (CBT). CBT is a type of therapy that focuses on changing unhelpful thinking patterns and behaviors. One key component of CBT is the identification and examination of negative automatic thoughts.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl my-3 `}>Step 1: Develop Awareness</Text>
            <Text style={tw`text-white mx-2 text-lg`}>
            The first step in managing NATs is to become aware of them. This may involve keeping a thought diary, where you write down your negative thoughts and the situations that trigger them. This can help you to identify patterns in your thinking and understand the ways in which your thoughts impact your feelings and behaviors.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl my-3 `}>Step 2: Challenge Them</Text>
            <Text style={tw`text-white mx-2 text-lg`}>
            The next step is to challenge the negative thoughts. This may involve asking yourself questions such as “Is this thought really true?” and “What evidence do I have to support this thought?”. You may also choose to reframe your negative thoughts in a more positive light, for example, “I made a mistake, but that doesn’t mean I’m a failure”.
            </Text>

            <Text style={tw`text-white mx-2 text-2xl my-3 `}>Step 3: Replace Them</Text>
            <Text style={tw`text-white mx-2 text-lg`}>
            Finally, it is important to replace negative thoughts with more positive, self-affirming thoughts. This may involve practicing self-compassion, focusing on your strengths and achievements, and reminding yourself of past successes.
            </Text>

            <Text style={tw`text-white mx-2 text-lg`}>
            In conclusion, negative automatic thoughts can have a significant impact on mental health and well-being. Understanding this concept and learning strategies for managing NATs can be a valuable step towards improving your mental health and achieving greater happiness and fulfillment. Whether you are seeking treatment for yourself or for a loved one, CBT can be an effective tool for managing negative automatic thoughts and achieving a greater sense of well-being.
            </Text>

            

           
            
          
          </View>,

            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/nat.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/nat.jpg')} />
        },
        {
            title: "Learn How Behavioral Activation Can Help You Overcome Depression and Anxiety", 
            eventName:"article_BA",
            descriptionShort:"Boost your mood with behavioural activation: A psychological approach to overcoming anxiety and depression.", 
            content:
            <View>
            <Text style={tw`text-white mx-2 text-2xl `}>What is Behavioural Activitation (BA)?</Text>
            
            <Text style={tw`text-white mx-2 text-lg mt-2`}>
            Behavioral activation is a therapeutic approach that focuses on increasing an individual's engagement in positive and rewarding activities. This approach is often used to treat depression and anxiety, as well as other mental health conditions. The premise of behavioral activation is that by increasing our involvement in meaningful and enjoyable activities, we can improve our mood and overall well-being.

            </Text>
            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            Behavioral activation involves setting achievable goals and breaking them down into smaller, manageable steps. This can help to increase an individual's motivation and confidence, as well as to reduce feelings of hopelessness and helplessness.



            </Text>
            
            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            One of the key components of behavioral activation is to increase exposure to positive experiences. This may involve engaging in activities that bring joy and pleasure, such as hobbies or exercise. It may also involve identifying and challenging negative thought patterns that interfere with our ability to enjoy life's experiences.



            </Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            Another component of behavioral activation is to reduce engagement in behaviors that are not helpful or that interfere with our ability to engage in positive activities. This may involve reducing time spent in front of screens, avoiding negative people or situations, or reducing unhealthy coping mechanisms such as substance abuse.
            </Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            Behavioral activation has been shown to be effective in treating a variety of mental health conditions, including depression, anxiety, and substance abuse. The approach is based on sound scientific principles and has been supported by numerous studies and clinical trials.
            </Text>

            <Text style={tw`text-white mx-2 text-lg mt-3`}>
            In conclusion, behavioral activation is a powerful and effective approach for individuals looking to improve their mental health and well-being. By increasing engagement in positive and rewarding activities, individuals can improve their mood, reduce feelings of hopelessness and helplessness, and achieve a greater sense of meaning and purpose in life. Whether you are seeking treatment for yourself or for a loved one, behavioral activation can be a valuable tool for promoting mental health and happiness.
            </Text>

           
            
          
          </View>,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/ba.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/ba.jpg')} />
        },
        
    ]


    const psychoeducation = [
        {
            title:"Visioning: The Psychological Technique That Can Change Your Life",
            eventName:"article_Visioning",
            descriptionShort:"You can't get where you want to go if you don't first aim at it. Worthwhile goals take visioning, planning and goal setting. Learn more here. ",
            content:
            <View>
            <Text style={tw`text-white mx-2 text-lg mt-2`}>
            A compelling vision for your life is an essential tool for setting and achieving your goals. It helps you to clarify your aspirations, stay motivated and focused, and navigate the path towards your ideal future. A compelling vision is a clear and inspiring picture of what you want to achieve, who you want to become, and the kind of life you want to live.
Here are the steps to creating a compelling vision for your life:
</Text>
<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>

Step 1: Identify Your Values
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
Your values are the principles and beliefs that guide your behavior and influence your decisions. To create a vision that is meaningful and aligned with who you are, it's essential to first identify your core values. Ask yourself what is most important to you, what you stand for, and what you want to contribute to the world. Write down your values and prioritize them by order of importance.
</Text>

<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
Step 2: Imagine Your Ideal Future
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
Once you have identified your values, it's time to let your imagination soar and dream big about what you want to achieve and the kind of life you want to live. Think about where you want to be in 5, 10, 20 years from now, and consider all aspects of your life, including personal, professional, financial, and relationships. Write down your vision in detail, using vivid and positive language, and focus on the feelings and experiences that you want to have.
</Text>

<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
Step 3: Create an Action Plan
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
Your vision is only as powerful as the action you take to bring it to life. Once you have a clear picture of your ideal future, create an action plan to move closer to your vision. Break down your vision into smaller, more manageable goals, set deadlines, and identify the resources, skills, and support you need to achieve each goal.
</Text>

<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
Step 4: Review and Refine Your Vision
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
A compelling vision is a dynamic and evolving process, and it's essential to review and refine it regularly. As you make progress towards your goals, you may discover new opportunities and challenges, and gain new insights that can help you refine and improve your vision. Take time to celebrate your achievements and reflect on your progress, and ask yourself what you have learned and what needs to be improved.
</Text>

<Text style={tw`text-white font-bold mx-2 text-lg mt-2`}>
Why is a Compelling Vision Important?
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
A compelling vision provides you with direction and purpose, helping you to make better decisions, prioritize your time and resources, and stay focused on your goals. It increases motivation and focus, keeping you inspired and on track towards your ideal future. A compelling vision also helps you overcome obstacles, cultivate resilience, and achieve your full potential.

In conclusion, a compelling vision is a powerful tool for setting and achieving your goals, and it provides you with direction, purpose, and motivation to live a fulfilling and meaningful life. By creating a compelling vision and taking action towards it, you can bring your aspirations to life and achieve the kind of life you want to live.
</Text>
            
           
            
          
          </View>,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/Vision.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/Vision.jpg')} />
        },
        {
            title:"Guide to DBT: A Science-Backed Approach to Improved Mental Health",
            eventName:"article_DBT",
            descriptionShort:"Regain control of emotions: An introduction to dialectical behaviour therapy (DBT).",
            content:
            <View>
                <Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>Background</Text>
            
            <Text style={tw`text-white mx-2 text-lg mt-2`}>
            Dialectical Behavior Therapy (DBT) is a type of psychotherapy that was developed by psychologist Marsha Linehan in the late 1980s. DBT is a form of cognitive-behavioral therapy that combines mindfulness and acceptance-based techniques with problem-solving strategies to help individuals manage intense emotions, thoughts, and behaviors. The goal of DBT is to help individuals improve their overall quality of life by learning new skills to manage difficult situations and to build a fulfilling and meaningful life.

DBT was originally designed to help individuals with Borderline Personality Disorder (BPD), but it has since been found to be effective for a wide range of mental health conditions, including depression, anxiety, post-traumatic stress disorder (PTSD), and eating disorders.
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>Key Features</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>
One of the key features of DBT is its emphasis on mindfulness and acceptance. Mindfulness involves paying attention to the present moment without judgment, while acceptance involves accepting thoughts, emotions, and experiences without trying to change them. This focus on mindfulness and acceptance helps individuals to better understand and regulate their emotions, and to develop a greater sense of self-awareness.

In addition to mindfulness and acceptance, DBT also teaches individuals specific skills to help manage difficult thoughts and behaviors.
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
These skills include:
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
Mindfulness skills: 
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 `}>
Teach individuals how to focus their attention on the present moment and to be more aware of their thoughts and emotions.
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
Emotion regulation skills: 
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 `}>
Teach individuals how to identify and manage their emotions in a healthy and effective way.
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
Interpersonal effectiveness skills: 
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 `}>
Teach individuals how to communicate assertively and effectively in their relationships, and to maintain healthy boundaries.
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
Distress tolerance skills: 
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 `}>
Teach individuals how to tolerate and manage difficult emotions and situations in a healthy way.
</Text>


<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
Delivery:
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 `}>
DBT is typically delivered in a group setting, with weekly individual therapy sessions and weekly group skills training sessions. This allows individuals to practice and apply the skills they have learned in a supportive and structured environment, and to receive feedback and guidance from their therapist and peers.
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>
Why is DBT Helpful?
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
DBT is a highly effective form of psychotherapy that has been shown to produce significant improvements in a wide range of mental health conditions. The combination of mindfulness, acceptance, and specific skills training helps individuals to better manage difficult thoughts, emotions, and behaviors, and to build a fulfilling and meaningful life.

DBT also provides a structured and supportive environment that helps individuals to feel safe and empowered to explore their thoughts and emotions. The group format of DBT allows individuals to receive feedback and support from their therapist and peers, and to build a sense of community and belonging.
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>Conclusion</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>
In conclusion, DBT is a highly effective form of psychotherapy that has been shown to help individuals with a wide range of mental health conditions. By combining mindfulness and acceptance with specific skills training, DBT helps individuals to better manage difficult thoughts, emotions, and behaviors, and to build a fulfilling and meaningful life. If you or someone you know is struggling with a mental health condition, consider seeking the support of a qualified DBT therapist.
           </Text> 
          
          </View>,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/dbt.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/dbt.jpg')} />
        },
        {
            title:"How The Brain Works: Focus",
            eventName:"article_Focus",
            descriptionShort:"Learn how the brain identifies tasks, ignores distraction and accelerates productivity with it's built in focus circuits.",
            content:
            <View>
            
            <Text style={tw`text-white mx-2 text-lg mt-2`}>
            The human brain has several attentional systems that play a critical role in our ability to focus and be productive. Understanding these systems and how they work can help us to leverage them for optimal productivity. In this article, we will discuss the key attentional systems and how they impact productivity, as well as several strategies for leveraging these systems for maximum results.
            </Text>
            <Text style={tw`text-white font-bold mx-2 text-lg mt-2`}>
The Alerting Network
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
The alerting network is responsible for maintaining a state of alertness and vigilance, and it is essential for keeping us focused and awake. When the alerting network is activated, we experience a surge of energy and focus, and our ability to perform complex tasks and remember information is enhanced.

To leverage the alerting network for optimal productivity, it is essential to take regular breaks and engage in activities that increase alertness, such as exercise, exposure to natural light, and taking short walks. Additionally, consuming caffeine or other stimulants can also help to activate the alerting network and improve focus and productivity.
</Text>

<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
The Orienting Network
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
The orienting network is responsible for our ability to orient ourselves to new stimuli, and it is essential for staying focused on important tasks and avoiding distractions. When the orienting network is activated, our attention is drawn to new stimuli, and we can quickly shift our focus from one task to another.

To leverage the orienting network for productivity, it is important to minimize distractions and to prioritize tasks based on their importance. Additionally, it is essential to limit multitasking and to focus on one task at a time to ensure that the orienting network is not overstimulated, which can lead to decreased productivity.

</Text>

<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
The Executive Control Network
</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
The executive control network is responsible for our ability to regulate attention, prioritize tasks, and make decisions. This network is essential for goal-directed behavior and helps us to stay focused on tasks that are important to us.

To leverage the executive control network for productivity, it is essential to set specific goals, prioritize tasks based on their importance, and avoid distractions. Additionally, it is important to practice mindfulness and to avoid making decisions when you are tired or distracted, as this can impair the executive control network's ability to regulate attention.
</Text>

<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
The Dorsolateral Prefrontal Cortex
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>
The dorsolateral prefrontal cortex is responsible for working memory and executive function, and it is essential for complex problem-solving and decision-making. This part of the brain helps us to stay focused on tasks and to remember information that is important to us.

To leverage the dorsolateral prefrontal cortex for productivity, it is essential to engage in activities that challenge the brain, such as reading, learning new skills, and playing games that require strategy and problem-solving. Additionally, it is important to eat a healthy diet, get enough sleep, and exercise regularly to maintain the health of this part of the brain.
</Text>
<Text style={tw`text-white mx-2 font-bold text-lg mt-2`}>
    Conclusion
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>
In conclusion, the human brain has several attentional systems that play a critical role in our ability to focus and be productive. By understanding these systems and how they work, we can leverage them for optimal productivity and achieve our goals. Whether you are a student, an employee, or an entrepreneur, by utilizing these strategies, you can improve your focus, stay productive, and achieve your full potential.
</Text>


          
          </View>,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/Focus.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/Focus.jpg')} />
        },
        {
            title:"Zone 2 Exercise: A Transformational Technique for Enhanced Physical and Mental Well-Being",
            eventName:"article_Zone2",
            descriptionShort:"Maximize mental health: the benefits of zone 2 exercise for mind-body wellness.",
            content:
            <View>
            
            <Text style={tw`text-white mx-2 text-lg mt-2`}>
            Exercise has long been recognized as a crucial aspect of physical health, but its impact on mental well-being is only now beginning to receive the attention it deserves. In particular, Zone 2 exercise, which refers to low-intensity physical activity that is sustained over a longer period of time, has been shown to have a powerful effect on mental health.
            
There are several ways in which Zone 2 exercise contributes to better mental health. 
</Text>
<Text style={tw`text-white mx-2 text-lg font-bold mt-2`}>
Stress Management
</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>
First and foremost, it has been shown to have a profound impact on stress levels. Studies have shown that low-intensity exercise, such as that done in Zone 2, can significantly reduce levels of the stress hormone cortisol. This, in turn, can lead to a reduction in symptoms of stress and anxiety. Additionally, Zone 2 exercise has been shown to improve mood and increase feelings of happiness and well-being.
</Text>

<Text style={tw`text-white mx-2 text-lg font-bold mt-2`}>Cognitive Function</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>Another important benefit of Zone 2 exercise is its ability to improve cognitive function. Research has shown that low-intensity exercise can help to improve memory, focus, and concentration. This is likely due to the fact that exercise stimulates the production of certain neurotransmitters and growth factors that play a key role in cognitive function. Additionally, exercise has been shown to increase the size of the hippocampus, the part of the brain responsible for learning and memory, which can further enhance cognitive function.</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>Less Depression</Text>
<Text style={tw`text-white mx-2 text-lg mt-2`}>Beyond its cognitive benefits, Zone 2 exercise can also help to manage symptoms of depression. Studies have shown that low-intensity exercise can have a powerful effect on mood and can reduce symptoms of depression in individuals with the condition. Additionally, Zone 2 exercise has been shown to have a beneficial impact on sleep quality, which can further improve mental health. By promoting better sleep, exercise can help to reduce symptoms of depression and anxiety and improve overall well-being.</Text>

<Text style={tw`text-white mx-2 text-lg mt-2 font-bold`}>Great for Socializing</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>Finally, Zone 2 exercise is an excellent way to build and maintain social connections. Engaging in low-intensity physical activity can be a great way to meet new people and form new relationships. Additionally, exercising with others can provide a sense of community and support, which is important for maintaining good mental health. Whether you join a fitness class or simply walk with a friend, Zone 2 exercise provides a valuable opportunity to connect with others and improve your mental health.</Text>

<Text style={tw`text-white mx-2 text-lg mt-2`}>
In conclusion, Zone 2 exercise has a significant impact on mental health and well-being. From reducing stress and anxiety to improving mood and cognitive function, this type of exercise has a range of benefits that are essential for maintaining good mental health. Whether you're looking to improve your mental well-being or simply stay active, Zone 2 exercise is a great way to achieve both. So why not start incorporating it into your routine today and experience its many benefits for yourself?
</Text>
            
          </View>,
            articleImage:<Image style={[tw`w-80 rounded-xl h-75`, {width:width-40}]}  source={require('../assets/z2.jpg')} />,
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.5}]} source={require('../assets/z2.jpg')} />
        },

    ]


  return (
    <View style={[tw`flex-1 ${Platform.OS=="android" && `bg-black`}`,{width:width, height:height}]}>
    {Platform.OS != 'android' &&
  <LinearGradient 
  
  colors={['#182E77','#EA1D3F']}
  start={{x:0.05, y:0.6}}
  end={{x:0.9, y:0.3}}
  locations={[0.1,0.99]}
  
  
  style={{width:width, height:height, opacity:0.65}}
  />
  }
    
    <View style={[tw`flex-1 justify-start mt-15 `,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <ScrollView
        
        contentContainerStyle={tw`pb-40`}
        showsVerticalScrollIndicator={false}
        >
           
            <Text style={tw`text-3xl text-white ml-4`}>Core Knowledge</Text>
            <Text style={tw`text-lg font-light text-white ml-4`}>Key concepts from the world of psychological science</Text>
            <FlatList 
            data={gettingStarted}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToInterval={width-80}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity  onPress={async ()=> {
                        await analytics().logEvent(`${itemData.item.eventName}`,{
                            id:itemData.item.title
                        })
                        navigation.navigate({name:'ContentScreen', params: {fullArticle:itemData.item, content:itemData.item.content, contentImage: itemData.item.articleImage}})
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.descriptionShort}</Text>
                      
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />

            <Text style={tw`text-3xl text-white ml-4`}>Psychoeducation</Text>
            <Text style={tw`text-lg font-light text-white ml-4`}>General articles about the science of Psychology.</Text>
            <FlatList 
            data={psychoeducation}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToInterval={width-80}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity  onPress={async ()=> {
                        await analytics().logEvent(`${itemData.item.eventName}`, {
                            id:itemData.item.title
                        })
                        navigation.navigate({name:'ContentScreen', params: {fullArticle:itemData.item, content:itemData.item.content, contentImage: itemData.item.articleImage}})
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.descriptionShort}</Text>
                      
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
            

            </ScrollView>
    </View>
    </View>
  )
}