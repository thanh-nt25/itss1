import React, { useEffect, useState } from "react";
// import "./lecture.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TestOverview from "../../components/testoverview/TestOverview"
import DoTest from "../../components/testoverview/DoTest"
import TestResult from "../../components/testoverview/TestResult"
import axiosInstance from "@/api/axiosInstance";

const test = {
  "test1": {
    "title": "JLPT N5 練習テスト",
    "timeLimit": 600,
    "testImage": "https://newwindows.edu.vn/wp-content/uploads/2023/05/dang-ky-jlpt.jpg",
    "id": "test_001",
    "number_of_questions": 20,
    "description":"このテストは、日本語能力を測定するためのものです。語彙、文法、読解力を中心に、空欄補充や選択式の問題が含まれています。全20問で構成されており、初心者から中級レベルの学習者に適しています。すべての質問に正確に答え、あなたの実力を確認してください。頑張ってください！",
    "questions": [
      {
        "id": "q1",
        "type": "fill_in_the_blank",
        "question": "\u3053\u306e ___ \u306f\u3059\u3070\u3089\u3057\u3044\u3067\u3059\u3002",
        "answer": "本",
        "image": null
      },
      {
        "id": "q2",
        "type": "single_choice",
        "question": "\u4eca\u65e5\u306e\u5929\u6c17\u306f\u3069\u3046\u3067\u3059\u304b\uff1f",
        "options": ["晴れ", "雨", "雪", "曇り"],
        "answer": "晴れ",
        "image": "https://example.com/question2.jpg"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u306b\u3064\u3044\u3066\u8a71\u3057\u3066\u3044\u307e\u3059\u3002\u3069\u308c\u304c\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u3067\u3059\u304b\uff1f",
        "options": ["寿司", "ピザ", "お好み焼き", "ハンバーガー"],
        "answer": ["寿司", "お好み焼き"],
        "image": null
      },
      {
        "id": "q4",
        "type": "fill_in_the_blank",
        "question": "\u3042\u306a\u305f\u306e\u30da\u30c3\u30c8\u306f\u3069\u3053\u306b___\u304b\uff1f",
        "answer": "います",
        "image": null
      },
      {
        "id": "q5",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u4f1a\u8a71\u3067\u4f7f\u3046\u666e\u901a\u306e\u6328\u62f6\u306f\uff1f",
        "options": ["こんにちは", "ありがとう", "さようなら", "すみません"],
        "answer": "こんにちは",
        "image": null
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "\u30d5\u30eb\u30fc\u30c4\u306b\u542b\u307e\u308c\u308b\u3082\u306e\u306f\uff1f",
        "options": ["りんご", "オレンジ", "ごはん", "バナナ"],
        "answer": ["りんご", "オレンジ", "バナナ"],
        "image": "https://example.com/question6.jpg"
      },
      {
        "id": "q7",
        "type": "fill_in_the_blank",
        "question": "\u79c1\u306e\u30c8\u30e2\u30c0\u30c1\u306f___\u304c\u3044\u3044\u3067\u3059\u3002",
        "answer": "犬",
        "image": null
      },
      {
        "id": "q8",
        "type": "single_choice",
        "question": "\u4f11\u307f\u306e\u65e5\u306b\u4f55\u3092\u3057\u307e\u3059\u304b\uff1f",
        "options": ["勉強", "旅行", "仕事", "テレビを見る"],
        "answer": "旅行",
        "image": null
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "\u590f\u306e\u6d77\u3067\u306e\u6d3b\u52d5\u306f\uff1f",
        "options": ["泳ぐ", "砂遊び", "スキー", "日光浴"],
        "answer": ["泳ぐ", "砂遊び", "日光浴"],
        "image": "https://example.com/question9.jpg"
      },
      {
        "id": "q10",
        "type": "fill_in_the_blank",
        "question": "\u79c1\u306e\u8a95\u751f\u65e5\u306f___\u6708\u3067\u3059\u3002",
        "answer": "12",
        "image": null
      },
      {
        "id": "q11",
        "type": "single_choice",
        "question": "\u3042\u3055\u3063\u3066\u306e\u5929\u6c17\u306f\uff1f",
        "options": ["晴れ", "雨", "曇り", "雪"],
        "answer": "曇り",
        "image": "https://example.com/question11.jpg"
      },
      {
        "id": "q12",
        "type": "multiple_choice",
        "question": "\u30c7\u30b6\u30fc\u30c8\u3067\u98df\u3079\u3089\u308c\u308b\u3082\u306e\u306f\uff1f",
        "options": ["ケーキ", "アイスクリーム", "ピザ", "寿司"],
        "answer": ["ケーキ", "アイスクリーム", "ピザ"],
        "image": null
      },
      {
        "id": "q13",
        "type": "fill_in_the_blank",
        "question": "\u65e5\u672c\u3067\u6700\u3082\u6709\u540d\u306a\u5c71\u306f___\u3067\u3059\u3002",
        "answer": "富士山",
        "image": null
      },
      {
        "id": "q14",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u304a\u83d3\u5b50\u306f\uff1f",
        "options": ["チョコレート", "せんべい", "ケーキ", "パン"],
        "answer": "せんべい",
        "image": null
      },
      {
        "id": "q15",
        "type": "multiple_choice",
        "question": "\u51ac\u306b\u3084\u308b\u30b9\u30dd\u30fc\u30c4\u306f\uff1f",
        "options": ["スキー", "スノーボード", "サッカー", "テニス"],
        "answer": ["スキー", "スノーボード"],
        "image": "https://example.com/question15.jpg"
      },
      {
        "id": "q16",
        "type": "fill_in_the_blank",
        "question": "\u65e5\u672c\u306e\u4f4f\u6c11\u306f___\u3092\u98df\u3079\u307e\u3059\u3002",
        "answer": "ごはん",
        "image": null
      },
      {
        "id": "q17",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u3057\u3085\u307f\u306f\uff1f",
        "options": ["書道", "ピアノ", "ダンス", "ゴルフ"],
        "answer": "書道",
        "image": null
      },
      {
        "id": "q18",
        "type": "multiple_choice",
        "question": "\u65e5\u672c\u306e\u90fd\u5e02\u306f\uff1f",
        "options": ["東京", "大阪", "京都", "名古屋"],
        "answer": ["東京", "大阪", "京都"],
        "image": "https://example.com/question18.jpg"
      },
      {
        "id": "q19",
        "type": "fill_in_the_blank",
        "question": "\u79c1\u306e\u4f1a\u793e\u306f___\u306b\u3042\u308a\u307e\u3059\u3002",
        "answer": "東京",
        "image": null
      },
      {
        "id": "q20",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u4f8b\u7968\u306f\uff1f",
        "options": ["100円", "500円", "1000円", "2000円"],
        "answer": "1000円",
        "image": null
      }
    ]
  },
  "test2":   {
    "title": "JLPT N4 練習テスト",
    "timeLimit": 600,
    "testImage": "https://newwindows.edu.vn/wp-content/uploads/2023/05/dang-ky-jlpt.jpg",
    "id": "test_001",
    "number_of_questions": 20,
    "description":"このテストは、日本語能力を測定するためのものです。語彙、文法、読解力を中心に、空欄補充や選択式の問題が含まれています。全20問で構成されており、初心者から中級レベルの学習者に適しています。すべての質問に正確に答え、あなたの実力を確認してください。頑張ってください！",
    "questions": [
      {
        "id": "q1",
        "type": "fill_in_the_blank",
        "question": "\u3053\u306e ___ \u306f\u3059\u3070\u3089\u3057\u3044\u3067\u3059\u3002",
        "answer": "本",
        "image": null
      },
      {
        "id": "q2",
        "type": "single_choice",
        "question": "\u4eca\u65e5\u306e\u5929\u6c17\u306f\u3069\u3046\u3067\u3059\u304b\uff1f",
        "options": ["晴れ", "雨", "雪", "曇り"],
        "answer": "晴れ",
        "image": "https://example.com/question2.jpg"
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "question": "\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u306b\u3064\u3044\u3066\u8a71\u3057\u3066\u3044\u307e\u3059\u3002\u3069\u308c\u304c\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u3067\u3059\u304b\uff1f",
        "options": ["寿司", "ピザ", "お好み焼き", "ハンバーガー"],
        "answer": ["寿司", "お好み焼き"],
        "image": null
      },
      {
        "id": "q4",
        "type": "fill_in_the_blank",
        "question": "\u3042\u306a\u305f\u306e\u30da\u30c3\u30c8\u306f\u3069\u3053\u306b___\u304b\uff1f",
        "answer": "います",
        "image": null
      },
      {
        "id": "q5",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u4f1a\u8a71\u3067\u4f7f\u3046\u666e\u901a\u306e\u6328\u62f6\u306f\uff1f",
        "options": ["こんにちは", "ありがとう", "さようなら", "すみません"],
        "answer": "こんにちは",
        "image": null
      },
      {
        "id": "q6",
        "type": "multiple_choice",
        "question": "\u30d5\u30eb\u30fc\u30c4\u306b\u542b\u307e\u308c\u308b\u3082\u306e\u306f\uff1f",
        "options": ["りんご", "オレンジ", "ごはん", "バナナ"],
        "answer": ["りんご", "オレンジ", "バナナ"],
        "image": "https://example.com/question6.jpg"
      },
      {
        "id": "q7",
        "type": "fill_in_the_blank",
        "question": "\u79c1\u306e\u30c8\u30e2\u30c0\u30c1\u306f___\u304c\u3044\u3044\u3067\u3059\u3002",
        "answer": "犬",
        "image": null
      },
      {
        "id": "q8",
        "type": "single_choice",
        "question": "\u4f11\u307f\u306e\u65e5\u306b\u4f55\u3092\u3057\u307e\u3059\u304b\uff1f",
        "options": ["勉強", "旅行", "仕事", "テレビを見る"],
        "answer": "旅行",
        "image": null
      },
      {
        "id": "q9",
        "type": "multiple_choice",
        "question": "\u590f\u306e\u6d77\u3067\u306e\u6d3b\u52d5\u306f\uff1f",
        "options": ["泳ぐ", "砂遊び", "スキー", "日光浴"],
        "answer": ["泳ぐ", "砂遊び", "日光浴"],
        "image": "https://example.com/question9.jpg"
      },
      {
        "id": "q10",
        "type": "fill_in_the_blank",
        "question": "\u79c1\u306e\u8a95\u751f\u65e5\u306f___\u6708\u3067\u3059\u3002",
        "answer": "12",
        "image": null
      },
      {
        "id": "q11",
        "type": "single_choice",
        "question": "\u3042\u3055\u3063\u3066\u306e\u5929\u6c17\u306f\uff1f",
        "options": ["晴れ", "雨", "曇り", "雪"],
        "answer": "曇り",
        "image": "https://example.com/question11.jpg"
      },
      {
        "id": "q12",
        "type": "multiple_choice",
        "question": "\u30c7\u30b6\u30fc\u30c8\u3067\u98df\u3079\u3089\u308c\u308b\u3082\u306e\u306f\uff1f",
        "options": ["ケーキ", "アイスクリーム", "ピザ", "寿司"],
        "answer": ["ケーキ", "アイスクリーム", "ピザ"],
        "image": null
      },
      {
        "id": "q13",
        "type": "fill_in_the_blank",
        "question": "\u65e5\u672c\u3067\u6700\u3082\u6709\u540d\u306a\u5c71\u306f___\u3067\u3059\u3002",
        "answer": "富士山",
        "image": null
      },
      {
        "id": "q14",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u304a\u83d3\u5b50\u306f\uff1f",
        "options": ["チョコレート", "せんべい", "ケーキ", "パン"],
        "answer": "せんべい",
        "image": null
      },
      {
        "id": "q15",
        "type": "multiple_choice",
        "question": "\u51ac\u306b\u3084\u308b\u30b9\u30dd\u30fc\u30c4\u306f\uff1f",
        "options": ["スキー", "スノーボード", "サッカー", "テニス"],
        "answer": ["スキー", "スノーボード"],
        "image": "https://example.com/question15.jpg"
      },
      {
        "id": "q16",
        "type": "fill_in_the_blank",
        "question": "\u65e5\u672c\u306e\u4f4f\u6c11\u306f___\u3092\u98df\u3079\u307e\u3059\u3002",
        "answer": "ごはん",
        "image": null
      },
      {
        "id": "q17",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u3057\u3085\u307f\u306f\uff1f",
        "options": ["書道", "ピアノ", "ダンス", "ゴルフ"],
        "answer": "書道",
        "image": null
      },
      {
        "id": "q18",
        "type": "multiple_choice",
        "question": "\u65e5\u672c\u306e\u90fd\u5e02\u306f\uff1f",
        "options": ["東京", "大阪", "京都", "名古屋"],
        "answer": ["東京", "大阪", "京都"],
        "image": "https://example.com/question18.jpg"
      },
      {
        "id": "q19",
        "type": "fill_in_the_blank",
        "question": "\u79c1\u306e\u4f1a\u793e\u306f___\u306b\u3042\u308a\u307e\u3059\u3002",
        "answer": "東京",
        "image": null
      },
      {
        "id": "q20",
        "type": "single_choice",
        "question": "\u65e5\u672c\u306e\u4f8b\u7968\u306f\uff1f",
        "options": ["100円", "500円", "1000円", "2000円"],
        "answer": "1000円",
        "image": null
      }
    ]
  } 
  
}
const test1 = {
  "title": "JLPT N5 練習テスト",
  "timeLimit": 600,
  "testImage": "https://newwindows.edu.vn/wp-content/uploads/2023/05/dang-ky-jlpt.jpg",
  "id": "test_001",
  "number_of_questions": 20,
  "description":"このテストは、日本語能力を測定するためのものです。語彙、文法、読解力を中心に、空欄補充や選択式の問題が含まれています。全20問で構成されており、初心者から中級レベルの学習者に適しています。すべての質問に正確に答え、あなたの実力を確認してください。頑張ってください！",
  "questions": [
    {
      "id": "q1",
      "type": "fill_in_the_blank",
      "question": "\u3053\u306e ___ \u306f\u3059\u3070\u3089\u3057\u3044\u3067\u3059\u3002",
      "answer": "本",
      "image": null
    },
    {
      "id": "q2",
      "type": "single_choice",
      "question": "\u4eca\u65e5\u306e\u5929\u6c17\u306f\u3069\u3046\u3067\u3059\u304b\uff1f",
      "options": ["晴れ", "雨", "雪", "曇り"],
      "answer": "晴れ",
      "image": "https://example.com/question2.jpg"
    },
    {
      "id": "q3",
      "type": "multiple_choice",
      "question": "\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u306b\u3064\u3044\u3066\u8a71\u3057\u3066\u3044\u307e\u3059\u3002\u3069\u308c\u304c\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u3067\u3059\u304b\uff1f",
      "options": ["寿司", "ピザ", "お好み焼き", "ハンバーガー"],
      "answer": ["寿司", "お好み焼き"],
      "image": null
    },
    {
      "id": "q4",
      "type": "fill_in_the_blank",
      "question": "\u3042\u306a\u305f\u306e\u30da\u30c3\u30c8\u306f\u3069\u3053\u306b___\u304b\uff1f",
      "answer": "います",
      "image": null
    },
    {
      "id": "q5",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u4f1a\u8a71\u3067\u4f7f\u3046\u666e\u901a\u306e\u6328\u62f6\u306f\uff1f",
      "options": ["こんにちは", "ありがとう", "さようなら", "すみません"],
      "answer": "こんにちは",
      "image": null
    },
    {
      "id": "q6",
      "type": "multiple_choice",
      "question": "\u30d5\u30eb\u30fc\u30c4\u306b\u542b\u307e\u308c\u308b\u3082\u306e\u306f\uff1f",
      "options": ["りんご", "オレンジ", "ごはん", "バナナ"],
      "answer": ["りんご", "オレンジ", "バナナ"],
      "image": "https://example.com/question6.jpg"
    },
    {
      "id": "q7",
      "type": "fill_in_the_blank",
      "question": "\u79c1\u306e\u30c8\u30e2\u30c0\u30c1\u306f___\u304c\u3044\u3044\u3067\u3059\u3002",
      "answer": "犬",
      "image": null
    },
    {
      "id": "q8",
      "type": "single_choice",
      "question": "\u4f11\u307f\u306e\u65e5\u306b\u4f55\u3092\u3057\u307e\u3059\u304b\uff1f",
      "options": ["勉強", "旅行", "仕事", "テレビを見る"],
      "answer": "旅行",
      "image": null
    },
    {
      "id": "q9",
      "type": "multiple_choice",
      "question": "\u590f\u306e\u6d77\u3067\u306e\u6d3b\u52d5\u306f\uff1f",
      "options": ["泳ぐ", "砂遊び", "スキー", "日光浴"],
      "answer": ["泳ぐ", "砂遊び", "日光浴"],
      "image": "https://example.com/question9.jpg"
    },
    {
      "id": "q10",
      "type": "fill_in_the_blank",
      "question": "\u79c1\u306e\u8a95\u751f\u65e5\u306f___\u6708\u3067\u3059\u3002",
      "answer": "12",
      "image": null
    },
    {
      "id": "q11",
      "type": "single_choice",
      "question": "\u3042\u3055\u3063\u3066\u306e\u5929\u6c17\u306f\uff1f",
      "options": ["晴れ", "雨", "曇り", "雪"],
      "answer": "曇り",
      "image": "https://example.com/question11.jpg"
    },
    {
      "id": "q12",
      "type": "multiple_choice",
      "question": "\u30c7\u30b6\u30fc\u30c8\u3067\u98df\u3079\u3089\u308c\u308b\u3082\u306e\u306f\uff1f",
      "options": ["ケーキ", "アイスクリーム", "ピザ", "寿司"],
      "answer": ["ケーキ", "アイスクリーム", "ピザ"],
      "image": null
    },
    {
      "id": "q13",
      "type": "fill_in_the_blank",
      "question": "\u65e5\u672c\u3067\u6700\u3082\u6709\u540d\u306a\u5c71\u306f___\u3067\u3059\u3002",
      "answer": "富士山",
      "image": null
    },
    {
      "id": "q14",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u304a\u83d3\u5b50\u306f\uff1f",
      "options": ["チョコレート", "せんべい", "ケーキ", "パン"],
      "answer": "せんべい",
      "image": null
    },
    {
      "id": "q15",
      "type": "multiple_choice",
      "question": "\u51ac\u306b\u3084\u308b\u30b9\u30dd\u30fc\u30c4\u306f\uff1f",
      "options": ["スキー", "スノーボード", "サッカー", "テニス"],
      "answer": ["スキー", "スノーボード"],
      "image": "https://example.com/question15.jpg"
    },
    {
      "id": "q16",
      "type": "fill_in_the_blank",
      "question": "\u65e5\u672c\u306e\u4f4f\u6c11\u306f___\u3092\u98df\u3079\u307e\u3059\u3002",
      "answer": "ごはん",
      "image": null
    },
    {
      "id": "q17",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u3057\u3085\u307f\u306f\uff1f",
      "options": ["書道", "ピアノ", "ダンス", "ゴルフ"],
      "answer": "書道",
      "image": null
    },
    {
      "id": "q18",
      "type": "multiple_choice",
      "question": "\u65e5\u672c\u306e\u90fd\u5e02\u306f\uff1f",
      "options": ["東京", "大阪", "京都", "名古屋"],
      "answer": ["東京", "大阪", "京都"],
      "image": "https://example.com/question18.jpg"
    },
    {
      "id": "q19",
      "type": "fill_in_the_blank",
      "question": "\u79c1\u306e\u4f1a\u793e\u306f___\u306b\u3042\u308a\u307e\u3059\u3002",
      "answer": "東京",
      "image": null
    },
    {
      "id": "q20",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u4f8b\u7968\u306f\uff1f",
      "options": ["100円", "500円", "1000円", "2000円"],
      "answer": "1000円",
      "image": null
    }
  ]
}
const test2 ={
  "title": "JLPT N4 練習テスト",
  "timeLimit": 600,
  "testImage": "https://newwindows.edu.vn/wp-content/uploads/2023/05/dang-ky-jlpt.jpg",
  "id": "test_001",
  "number_of_questions": 20,
  "description":"このテストは、日本語能力を測定するためのものです。語彙、文法、読解力を中心に、空欄補充や選択式の問題が含まれています。全20問で構成されており、初心者から中級レベルの学習者に適しています。すべての質問に正確に答え、あなたの実力を確認してください。頑張ってください！",
  "questions": [
    {
      "id": "q1",
      "type": "fill_in_the_blank",
      "question": "\u3053\u306e ___ \u306f\u3059\u3070\u3089\u3057\u3044\u3067\u3059\u3002",
      "answer": "本",
      "image": null
    },
    {
      "id": "q2",
      "type": "single_choice",
      "question": "\u4eca\u65e5\u306e\u5929\u6c17\u306f\u3069\u3046\u3067\u3059\u304b\uff1f",
      "options": ["晴れ", "雨", "雪", "曇り"],
      "answer": "晴れ",
      "image": "https://example.com/question2.jpg"
    },
    {
      "id": "q3",
      "type": "multiple_choice",
      "question": "\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u306b\u3064\u3044\u3066\u8a71\u3057\u3066\u3044\u307e\u3059\u3002\u3069\u308c\u304c\u65e5\u672c\u306e\u98df\u3079\u3082\u306e\u3067\u3059\u304b\uff1f",
      "options": ["寿司", "ピザ", "お好み焼き", "ハンバーガー"],
      "answer": ["寿司", "お好み焼き"],
      "image": null
    },
    {
      "id": "q4",
      "type": "fill_in_the_blank",
      "question": "\u3042\u306a\u305f\u306e\u30da\u30c3\u30c8\u306f\u3069\u3053\u306b___\u304b\uff1f",
      "answer": "います",
      "image": null
    },
    {
      "id": "q5",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u4f1a\u8a71\u3067\u4f7f\u3046\u666e\u901a\u306e\u6328\u62f6\u306f\uff1f",
      "options": ["こんにちは", "ありがとう", "さようなら", "すみません"],
      "answer": "こんにちは",
      "image": null
    },
    {
      "id": "q6",
      "type": "multiple_choice",
      "question": "\u30d5\u30eb\u30fc\u30c4\u306b\u542b\u307e\u308c\u308b\u3082\u306e\u306f\uff1f",
      "options": ["りんご", "オレンジ", "ごはん", "バナナ"],
      "answer": ["りんご", "オレンジ", "バナナ"],
      "image": "https://example.com/question6.jpg"
    },
    {
      "id": "q7",
      "type": "fill_in_the_blank",
      "question": "\u79c1\u306e\u30c8\u30e2\u30c0\u30c1\u306f___\u304c\u3044\u3044\u3067\u3059\u3002",
      "answer": "犬",
      "image": null
    },
    {
      "id": "q8",
      "type": "single_choice",
      "question": "\u4f11\u307f\u306e\u65e5\u306b\u4f55\u3092\u3057\u307e\u3059\u304b\uff1f",
      "options": ["勉強", "旅行", "仕事", "テレビを見る"],
      "answer": "旅行",
      "image": null
    },
    {
      "id": "q9",
      "type": "multiple_choice",
      "question": "\u590f\u306e\u6d77\u3067\u306e\u6d3b\u52d5\u306f\uff1f",
      "options": ["泳ぐ", "砂遊び", "スキー", "日光浴"],
      "answer": ["泳ぐ", "砂遊び", "日光浴"],
      "image": "https://example.com/question9.jpg"
    },
    {
      "id": "q10",
      "type": "fill_in_the_blank",
      "question": "\u79c1\u306e\u8a95\u751f\u65e5\u306f___\u6708\u3067\u3059\u3002",
      "answer": "12",
      "image": null
    },
    {
      "id": "q11",
      "type": "single_choice",
      "question": "\u3042\u3055\u3063\u3066\u306e\u5929\u6c17\u306f\uff1f",
      "options": ["晴れ", "雨", "曇り", "雪"],
      "answer": "曇り",
      "image": "https://example.com/question11.jpg"
    },
    {
      "id": "q12",
      "type": "multiple_choice",
      "question": "\u30c7\u30b6\u30fc\u30c8\u3067\u98df\u3079\u3089\u308c\u308b\u3082\u306e\u306f\uff1f",
      "options": ["ケーキ", "アイスクリーム", "ピザ", "寿司"],
      "answer": ["ケーキ", "アイスクリーム", "ピザ"],
      "image": null
    },
    {
      "id": "q13",
      "type": "fill_in_the_blank",
      "question": "\u65e5\u672c\u3067\u6700\u3082\u6709\u540d\u306a\u5c71\u306f___\u3067\u3059\u3002",
      "answer": "富士山",
      "image": null
    },
    {
      "id": "q14",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u304a\u83d3\u5b50\u306f\uff1f",
      "options": ["チョコレート", "せんべい", "ケーキ", "パン"],
      "answer": "せんべい",
      "image": null
    },
    {
      "id": "q15",
      "type": "multiple_choice",
      "question": "\u51ac\u306b\u3084\u308b\u30b9\u30dd\u30fc\u30c4\u306f\uff1f",
      "options": ["スキー", "スノーボード", "サッカー", "テニス"],
      "answer": ["スキー", "スノーボード"],
      "image": "https://example.com/question15.jpg"
    },
    {
      "id": "q16",
      "type": "fill_in_the_blank",
      "question": "\u65e5\u672c\u306e\u4f4f\u6c11\u306f___\u3092\u98df\u3079\u307e\u3059\u3002",
      "answer": "ごはん",
      "image": null
    },
    {
      "id": "q17",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u3057\u3085\u307f\u306f\uff1f",
      "options": ["書道", "ピアノ", "ダンス", "ゴルフ"],
      "answer": "書道",
      "image": null
    },
    {
      "id": "q18",
      "type": "multiple_choice",
      "question": "\u65e5\u672c\u306e\u90fd\u5e02\u306f\uff1f",
      "options": ["東京", "大阪", "京都", "名古屋"],
      "answer": ["東京", "大阪", "京都"],
      "image": "https://example.com/question18.jpg"
    },
    {
      "id": "q19",
      "type": "fill_in_the_blank",
      "question": "\u79c1\u306e\u4f1a\u793e\u306f___\u306b\u3042\u308a\u307e\u3059\u3002",
      "answer": "東京",
      "image": null
    },
    {
      "id": "q20",
      "type": "single_choice",
      "question": "\u65e5\u672c\u306e\u4f8b\u7968\u306f\uff1f",
      "options": ["100円", "500円", "1000円", "2000円"],
      "answer": "1000円",
      "image": null
    }
  ]
} 

const Tests = ({testNum = "test1"}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  async function fetchLectures() {
    try {
      const { data } = await axiosInstance.get(`/api/lectures/${"676cc96539a994da77bac09b"}`);
      setLectures(data.lectures);
      setLoading(false);
      
      if (data.lectures.length > 0) {
        setLecture(data.lectures[0]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleEndTest = () => {
    toast.success("Test finished!");
    setIsEnd(true);
    setIsStart(false);
  }

  const handleStartTest = () => {
    setIsStart(true);
  }

  const navigateLecture = (direction) => {
    const currentIndex = lectures.findIndex((lec) => lec._id === lecture._id);
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % lectures.length
        : (currentIndex - 1 + lectures.length) % lectures.length;
    setLecture(lectures[nextIndex]);
  };

  useEffect(() => {
    fetchLectures();
  }, []);
  
  return (
    <div className="">
      
      {
        loading ? (<Loading />) :(
          isEnd ? <TestResult/> :
        <>
          {
            isStart ? <DoTest test = {test.test1} isStart={isStart}/> : <TestOverview test = {test1}/> 
          }
          {
            isStart ? 
            <div className="flex justify-center mt-10">
              <button
                onClick={handleEndTest}
                className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                >
                提出する
              </button>
            </div>
            : 
            <div className="flex justify-center mt-10">
              <button
                onClick={handleStartTest}
                className="px-8 mb-5 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600"
                >
                始める
              </button>
            </div>
          }
          
        </>
        )
        
      }
    </div>
  
   
  )}



export default Tests;
{/* <TestOverview test = {test1}/> */}