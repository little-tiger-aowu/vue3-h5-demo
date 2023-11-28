<template>
  <div class="formBox">
    <div class="title">
      <img src="../assets/image/form/topBg.png" alt=""/>
      <strong class="content">填写表单抽奖</strong>
    </div>
    <div class="fromContent">
      <!-- 姓名 -->
      <van-form @submit="onSubmit">
        <div class="cellName"><small>*</small>1.姓名</div>
        <van-cell-group inset>
          <van-field
              v-model="userInfo.userName"
              name="userName"
              :rules="[{ required: true, message: '请填写姓名' }]"
          />
        </van-cell-group>
        <!-- 手机 -->
        <div class="cellName"><small>*</small>2.手机</div>
        <van-cell-group inset>
          <van-field
              v-model="userInfo.phone"
              name="phone"
              :rules="[
      { required: true, message: '请填写手机号' },
      { pattern, message: '手机号格式错误' }
    ]"
          />
        </van-cell-group>
        <!-- 邮箱 -->
        <div class="cellName"><small>*</small>3.邮箱</div>
        <van-cell-group inset>
          <van-field
              v-model="userInfo.Mailbox"
              name="Mailbox"
              :rules="[{ required: true, message: '请填写邮箱' },{ patternMailbox, message: '邮箱格式错误' }]"
          />
        </van-cell-group>
        <!-- 单位名称 -->
        <div class="cellName"><small>*</small>4.单位名称</div>
        <van-cell-group inset>
          <van-field
              v-model="userInfo.unitName"
              name="unitName"
              :rules="[{ required: true, message: '请填写单位名称' }]"
          />
        </van-cell-group>
        <!-- 职位 -->
        <div class="cellName"><small>*</small>5.职位（单选）</div>
        <van-cell-group style="border: 0" inset>
          <van-field
              :rules="[{ required: true, message: '请选择单位职位' }]"
              name="position"
          >
            <template #input>
              <van-radio-group style="margin: 0" v-model="userInfo.position">
                <van-radio
                    v-for="item in positionList"
                    :key="item"
                    icon-size="15px"
                    :name="item"
                >{{ item }}
                </van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group v-if="userInfo.position === '其他（请说明）'" inset>
          <van-field
              v-model="userInfo.positionOther"
              name="userName"
              :rules="[{ required: true, message: '请请填写其他职位' }]"
          />
        </van-cell-group>
        <!-- 单位名称 -->
        <div class="cellName">
          <small>*</small>6.是否有扫描电镜的采购计划（单选）
        </div>
        <van-cell-group style="border: 0" inset>
          <van-field
              :rules="[
              { required: true, message: '请选择是否有扫描电镜的采购计划' },
            ]"
              name="purchaselan1"
          >
            <template #input>
              <van-radio-group
                  style="margin: 0"
                  v-model="userInfo.purchaselan1"
              >
                <van-radio icon-size="15px" name="true">是</van-radio>
                <van-radio icon-size="15px" name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>

        <!-- 其他类电镜的采购计划 -->
        <div class="cellName" style="margin-left: 35px">
          7.是否有其他类电镜的采购计划（多选）
        </div>
        <van-cell-group style="border: 0" inset>
          <van-field name="purchaselan2">
            <template #input>
              <van-checkbox-group
                  style="margin: 0"
                  v-model="userInfo.purchaselan2"
                  shape="square"
              >
                <van-checkbox
                    v-for="item in purchaselan2List"
                    :key="item"
                    icon-size="15px"
                    :name="item"
                >{{ item }}
                </van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group v-if="userInfo.purchaselan2.indexOf('其他（请说明）') >= 0" inset>
          <van-field
              v-model="userInfo.purchaselan2Other"
              name="userName"
              :rules="[{ required: true, message: '请请填写其他职位' }]"
          />
        </van-cell-group>
        <div class="checkbox" style="width: 89%; scale: 0.89" shape="square">
          <van-cell-group style="border: 0" inset>
            <van-field name="productInfo">
              <template #input>
                <van-checkbox
                    style="margin: 0"
                    icon-size="15px"
                    name="productInfo"
                    v-model="userInfo.productInfo"
                    class="product"
                >需要发送产品资料
                </van-checkbox
                >
              </template>
            </van-field>
          </van-cell-group>
          <van-cell-group style="border: 0" inset>
            <van-field name="parameterTable">
              <template #input>
                <van-checkbox
                    style="margin: 0"
                    icon-size="15px"
                    v-model="userInfo.parameterTable"
                    class="product"
                >需要发送产品参数
                </van-checkbox
                >
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="checkbox" style="width: 100%" shape="square">
          <van-cell-group style="border: 0" inset>
            <van-field name="contactMe">
              <template #input>
                <van-checkbox
                    style="display: flex; align-items: flex-start"
                    icon-size="15px"
                    v-model="userInfo.contactMe"
                    class="product"
                >我同意赛默飞通过电子邮件、电话、短信或其他方式向我发送有关赛默飞产品或服务信息或与我取得联系。
                </van-checkbox
                >
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="Regulations">
          <div class="content">
            <small>*</small>
            <div style="color: #3db1f5">阅读《个人信息保护政策》</div>
          </div>
          <div class="tip">
            我已完整阅读并同意赛默飞《个人信息保护政策》，
            并同意赛默飞按照该政策处理我的个人信息。
          </div>
        </div>

        <div style="margin: 16px; display: flex; justify-content: center">
          <!-- <img
            type="primary"
            native-type="submit"
            style="width: 60%; margin-bottom: 20px"
            src="../assets/image/form/submitBtn.png"
            alt=""
          /> -->
          <van-button
              class="custom-button"
              block
              type="primary"
              native-type="submit"
          >
            <img
                class="button-image"
                style="width: 100%"
                src="../assets/image/form/submitBtn.png"
                alt="Button Image"
            />
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {formType} from "@/type";
import {addForm} from "@/api/path";
import {IData} from "@/type/request";
import {Toast} from 'vant'
import 'vant/es/toast/style/index';
import router from "@/router";
import {VueCookieNext} from "vue-cookie-next";


// 正则校验
const pattern = /^1[3456789]\d{9}$/;

const positionList = reactive([
  "项目负责人",
  "实验室技术人员",
  "实验室管理人员",
  "研发科学家",
  "公司/院校管理人员",
  "学生",
  "其他（请说明）",
]);
const purchaselan2List = reactive([
  "透射电镜",
  "双束电镜",
  "冷冻电镜",
  "其他（请说明）",
]);

const userInfo = reactive<formType>({
  userName: "",
  phone: "",
  Mailbox: "",
  unitName: "",
  position: "",
  positionOther: "",
  purchaselan1: "",
  purchaselan2: [],
  purchaselan2Other: "",
  productInfo: false,
  parameterTable: false,
  contactMe: false,
});

const onSubmit = (val: formType) => {
  Toast({
    type: 'loading',
    message: '提交中。。。',
    duration: 1500
  })
  let purchaselan2_back = []
  if (userInfo.purchaselan2.indexOf('其他（请说明）') >= 0) {
    purchaselan2_back = JSON.parse(JSON.stringify(userInfo.purchaselan2))
    let index = purchaselan2_back.indexOf('其他（请说明）')
    purchaselan2_back.splice(index, 1, "其他-" + userInfo.purchaselan2Other)
  }
  let data = {
    userName: userInfo.userName, // 用户名
    phone: userInfo.phone, // 电话
    email: userInfo.Mailbox, // 邮箱
    nickName: VueCookieNext.getCookie('nickname'),
    companyName: userInfo.unitName, // 单位名称
    job: userInfo.position === '其他（请说明）' ? '其他-' + userInfo.positionOther : userInfo.position, // 职位
    isScanningShop: userInfo.purchaselan1, // 是否有扫描电镜的采购计划
    isOtherScanningShop: purchaselan2_back.length ? purchaselan2_back.toString() : userInfo.purchaselan2.toString(), // 是否有其他类电镜的采购计划
    isSendProduct: userInfo.productInfo, // 需要发送产品资料
    isSendProductData: userInfo.parameterTable, // 需要产品参数
    isAgree: userInfo.contactMe, // 联系我
  }
  addForm(JSON.stringify(data)).then((res: IData) => {
    if (res.code === '00000') {
      setTimeout(() => {
        Toast.success('提交成功')
        router.go(-1)
        VueCookieNext.setCookie('isUserForm', 'true')
      }, 1500)
    } else {
      setTimeout(() => {
        Toast.fail(res.message)
      }, 1500)
    }
  })
};
</script>

<style scoped lang="scss">
.formBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;

  .title {
    position: relative;

    img {
      width: 100%;
      height: auto;
    }

    .content {
      width: 60%;
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translate(-40%, 0);
      letter-spacing: 3px;
      font-size: 30px;
      color: #999;
    }
  }

  .custom-button {
    padding: 0; /* 去除按钮的默认内边距 */
    background-color: transparent; /* 去除按钮的背景色 */
    border: none; /* 去除按钮的边框 */
    margin-bottom: 10px;
    width: 80%;
  }

  .Regulations {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    align-items: center;

    .content {
      display: flex;
      margin-bottom: 10px;
    }

    .tip {
      text-align: center;
      font-size: 12px;
      width: 100%;
      scale: (0.7);
    }
  }

  .fromContent {
    width: 100%;
    background-color: #eee;

    .van-form {
      width: 95%;
      margin: -8px auto 0 auto; //自适应布局 不要太多特定的控件大小 不要太少影响位置
      background-color: #fff;

      .cellName {
        font-size: 13px;
        margin-left: 30px;
        padding-top: 20px;

        .van-radio {
          padding: 10px;
        }
      }

      .van-checkbox-group,
      .van-radio-group {
        width: 80%;
        margin: 10px auto;

        .van-checkbox,
        .van-radio {
          font-size: 13px;
          margin: 5px 0;
          display: flex;
        }
      }

      .checkbox {
        width: 80%;
        margin: 20px auto;
        font-size: 11px;
        display: flex;
        justify-content: space-between;
      }

      :deep(.van-checkbox__icon--round .van-icon) {
        border-radius: 0;
      }

      .product {
        :deep(.van-badge__wrapper) {
          box-shadow: inset 2px 1px 2px 0px rgb(34, 33, 33);
        }
      }

      .van-checkbox-group {
        width: 80%;
        margin: 10px auto;

        .van-checkbox {
          font-size: 13px;
          margin: 5px 0;
        }
      }

      .van-cell-group {
        border: 1px solid #999;
        width: 80%;
        margin: 10px auto;
        border-radius: 0;

        .van-cell {
          padding: 5px !important;
        }
      }
    }
  }
}
</style>
