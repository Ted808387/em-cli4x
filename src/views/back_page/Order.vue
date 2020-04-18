<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
          <th class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortOrder" :key="item.id">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <span v-for="(product,index) in item.products" :key="index">
              {{ product.product.title }} 數量 : {{ product.qty }} {{ product.product.unit }}
              <br />
            </span>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">
              已付款
              <br />
              {{ item.paid_date | date }}
            </span>
            <span class="text-secondary" v-else>尚未付款</span>
            <br />
            <span class="text-danger" v-if="item.is_display === 1">已刪除此單</span>
          </td>
          <td>
            <button class="btn btn-outline-primary mx-auto d-block" @click="openOrder(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <pagination :getpagination="pagination" @userpage="getOrder"></pagination>
    <!-- Modal -->
    <div class="modal fade" id="OrderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm">
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_paid" v-model="updata.is_paid" :true-value="1" :false-value="0"/>
                    <label class="form-check-label" for="is_paid">是否付款</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_display" v-model="updata.is_display" :true-value="1" :false-value="0"/>
                    <label class="form-check-label" for="is_display">是否刪除</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';
import pagination from '../../components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      updata: {},
    };
  },
  components: {
    pagination,
  },
  methods: {
    getOrder(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.pagination = response.data.pagination;
        vm.orders = response.data.orders;
        vm.isLoading = false;
      });
    },
    openOrder(item) {
      this.updata = Object.assign({}, ...item); // item資料不要傳參考，不然會將資料洗掉，把原本有在的資料替換就好
      $('#OrderModal').modal('show');
    },
    updataOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.orders.id}`;
      vm.isLoading = true;
      vm.$http.put(api, { data: vm.updata }).then(() => {
        vm.isLoading = false;
        vm.getOrder();
        $('#OrderModal').modal('hide');
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      const neworder = vm.orders.sort((a, b) => {
        const A = a.is_paid ? 1 : 0;
        const B = b.is_paid ? 1 : 0;
        return A - B;
      });
      return neworder;
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
