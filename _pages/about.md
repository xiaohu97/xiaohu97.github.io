---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

## 关于我

我是一名专注于人形机器人和电机控制的在读博士研究生，致力于将先进的控制理论应用于机器人系统。我的研究兴趣包括人形机器人基于模型和基于学习的运控、参数辨识、状态估计和电机驱动，期待为机器人技术的发展贡献力量。
我将博士毕业于安徽合肥的 <a href="https://www.ustc.edu.cn/">中国科学技术大学</a> 工程科学学院/人形机器人研究院，我的导师是张世武教授和高纬老师。本科和硕士毕业于安徽合肥的 <a href="https://www.hfut.edu.cn/">合肥工业大学</a> 自动化专业。包括合著，我已发表多篇学术论文，具体见下方论文列表。 <a href='https://scholar.google.com/citations?user=_lZNOiUAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=引用"></a>。

**研究领域：**
- 人形机器人
- 关节电机控制
- 控制理论与控制工程
- 强化学习
- 参数辨识与状态估计
- 直线电机驱动

<span class='anchor' id='-xl'></span>

## 🎓 学历

- **2023.09 - 至今**  
  <a href="https://www.ustc.edu.cn/"><img class="svg" src="/images/USTC_logo.svg" width="23pt"></a> 中国科学技术大学 工程学院/人形机器人研究院，安徽合肥，博士研究生  
- **2019.09 - 2022.06**  
  <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="23pt"></a> 合肥工业大学 控制科学与工程，安徽合肥，硕士（工学硕士）  
- **2015.09 - 2019.07**  
  <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="20pt"></a> 合肥工业大学 自动化，安徽合肥，本科（工学学士）

<span class='anchor' id='-lwzl'></span>

## 📝 论文与专利

### 中文论文
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">中国电机工程学报</div><img src='images/观测器结构-英文概述.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
- **`张晓虎`, 赵吉文 等**  
  "基于自适应互联扩展卡尔曼观测器的永磁同步直线电机高精度抗干扰在线多参数辨识," *中国电机工程学报*, 2022, 42(12): 4571-4581.  
  (`中国电机工程学报年度优秀论文（TOP5%）`，`中国知网高影响力论文`，EI)  
</div>
</div>
---

### 英文论文
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IROS. 2024</div><img src='images/IROS2024_GraphicalAbstract_3405.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
- **H. Zhang#,`X. Zhang#`, J. Cheng, J. Hu, C. Ji, Y. Wang, Y. Jiang, Z. Han, W. Gao* and S. Zhang***  
  "Torque Ripple Reduction in Quasi-Direct Drive Motors Through Angle-Based Repetitive Learning Observer and Model Predictive Torque Controller," *2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)*,  Abu Dhabi, United Arab Emirates, pp. 3546-3552.  
  (机器人顶会，EI)
  [[网页]](https://ieeexplore.ieee.org/document/10801721)
</div>
</div>
---

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">LDIA 2021</div><img src='images/12月27日.gif' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

- **`X. Zhang`, J. Zhao et al.**  
  "Joint Kalman Observer for Mechanical Multi-parameter Decoupling Estimation of Permanent Magnet Synchronous Linear Motor," *2021 13th International Symposium on Linear Drives for Industry Applications (LDIA)*, 2021.  
  (EI)  
  [[网页]](https://ieeexplore.ieee.org/document/9505720)

</div>
</div>
---
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE Conf.</div><img src='images/遥操作.gif' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

- **X. Wang, Y. Zhu ，`X. Zhang`et al.**  
  "A Telepresence Enhancing Method Based on Human Arm Dynamics," *2024 IEEE International Conference on Robotics and Biomimetics (ROBIO)*, 2024.  
  (EI)  [[网页]](https://ieeexplore.ieee.org/abstract/document/10907667) 在这个项目里负责硬件系统设计，过程中也是第一次学习并完成stm32和esp32两版电路PCB设计加工，记录一下。

</div>
</div>
---

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE Trans. Ind. Informat.2020</div><img src='images/isa2020.svg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

- **Song Juncai, Zhao Jiwen,`X. Zhang` et al.**  
  "Accurate Demagnetization Faults Detection of Dual-Sided Permanent Magnet Linear Motor Using Enveloping and Time-Domain Energy Analysis," *IEEE Transactions on Industrial Informatics*, 2020, 16(10): 6334-6346.  
  (中科院 TOP, IF: 11.648)

</div>
</div>
---

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE Trans. Power Electron.2022</div><img src='images/微信截图_20250418203813.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

- **L. Wang, J. Zhao, X. Yang, Z. Zheng, `X. Zhang`, L. Wang**  
  "Robust Deadbeat Predictive Current Regulation for Permanent Magnet Synchronous Linear Motor Drivers With Parallel Parameter Disturbance and Load Observer," *IEEE Transactions on Power Electronics*, 2022, 37(7): 7834-7845.  
  (中科院 TOP, IF: 5.967)  [[网页]](https://doi.org/10.1109/TPEL.2022.3142119)

</div>
</div>

---

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE Trans. Instrum. Meas. 2022</div><img src='images/ieee_tim2022.svg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

- **D. Hu, J. Zhao, X. Yang, `X. Zhang`**  
  "Precision Motion Measurement for Linear Motor Based on FNCC and Phase Difference M-Estimator Robust Regression in a VLSM System," *IEEE Transactions on Instrumentation and Measurement*, 2022, 70: 5017310.  
  (SCI, IF: 5.332)  
  [[网页]](https://doi.org/10.1109/TIM.2021.3125706)

</div>
</div>

### 工程项目
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">全尺寸人形机器人.2024</div><img src='images/huge踢机器人.gif' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
- **`张晓虎`, both ，pocket 等**  
  "基于MPC+WBC的全尺寸人形机器人运动控制" 全程参与人形机器人机械部分迭代优化、电气系统设计、下位机通信接口、传统控制算法优化, 2024-至今.  
</div>
</div>
- *待补充*
---

### 专利

- **[P03] 一种腿式机器人的移动控制方法**  
  高纬，韩震，姜雨彤，岳永铭，`张晓虎`，王煜，张世武。发明专利，CN202411919748.1，授权日期：2025-01-24，申请日期：2024-12-25。  
- **[P02] 一种机器人关节准直驱电机转矩波动抑制方法**  
  张世武，`张晓虎`，张贺飞，高纬。发明专利，CN202410747271.7，实审中，申请日期：2024-06-11。  
- **[P01] 基于振动诱导的用于遥操作系统的力反馈方法及装置**  
  张世武，朱阅微，王腾达，高纬，`张晓虎`，谢远哲。发明专利，ZL202410471429.2，授权日期：2024-07-12，申请日期：2024-04-19。

<span class='anchor' id='-ryjx'></span>

## 🏅 荣誉奖项

- **2025** 安徽省大学生创新大赛`金奖` 
- **2023** `中国电机工程学报年度优秀论文`  
- **2023 - 至今** 中国科学技术大学 奖学金  
- **2022** 合肥工业大学 一等奖学金  
- **2018** 全国高校智能交通创新与创业大赛 二等奖  
- *其他奖项待补充（根据实际获奖情况补充）*

<span class='anchor' id='-xshy'></span>

## 🏛️ 学术会议

- **中国杭州** 参加 `IROS 2025` 国际会议  
- **阿联酋** 参加 `IROS 2024` 国际会议并做 Oral 报告  
- **中国武汉** 参加 `LDIA 2021` 国际会议并做海报展示  
- **中国合肥** 参加 2019、2023、2024 `世界制造业大会`  
- **中国沈阳** 参加中国机器人学术年会 (`CCRS 2019`)  

<span class='anchor' id='-gzsx'></span>

## 💻 工作实习

- **2025.09** 人形机器人企业，实习，安徽芜湖
- **2022 - 2023 ** 中国科学技术大学先进技术研究院，研究实习员，安徽合肥  
- *其他实习待补充（根据实际经历补充）*







