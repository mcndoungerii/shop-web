<template>
  <b-colxx class>
    <b-row>
      <b-col>
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('menu.products') }}</h1>
            <piaf-breadcrumb />
            <div class="float-sm-right">
              <b-button
                style="width: 100%;"
                @click="callAddModal"
                variant="primary"
                size="lg"
                class="top-right-button"
              >{{ $t('product.add-product') }}</b-button>

              <!-- Add Product Modal -->
              <modal
                :clickToClose="false"
                :scrollable="true"
                height="auto"
                :adaptive="true"
                name="modalAddProduct"
              >
                <div style="padding:30px">
                  <div>
                    <b-row>
                      <b-colxx cols="8">
                        <h1>{{newItem.id !== undefined?$t('product.edit-product'):$t('product.add-product')}}</h1>
                      </b-colxx>
                      <b-colxx cols="4" class="text-right">
                        <a href="#" @click="$modal.hide('modalAddProduct')">
                          <h1>
                            <i class="simple-icon-close"></i>
                          </h1>
                        </a>
                      </b-colxx>
                    </b-row>
                  </div>
                  <b-form>
                    <b-form-group :label="$t('product.name')">
                      <b-form-input v-model="newItem.name" />
                    </b-form-group>

                    <b-form-group :label="$t('product.description')">
                      <b-form-input v-model="newItem.description" />
                    </b-form-group>

                    <b-form-group :label="$t('product.serial')">
                      <b-form-input v-model="newItem.serial" />
                    </b-form-group>

                    <b-form-group :label="$t('product.unit')">
                      <b-form-input v-model="newItem.unit" />
                    </b-form-group>

                    <b-form-group>
                      <b-form-checkbox
                        v-model="newItem.isTax"
                        class="mb-2 mr-sm-2 mb-sm-0"
                      >{{ newItem.isTax?$t('product.isTax'):$t('product.isNotTax')}}</b-form-checkbox>
                    </b-form-group>
                    <b-form-group v-if="newItem.isTax" :label="$t('product.taxPercentage')">
                      <b-form-input v-model="newItem.taxPercentage" />
                    </b-form-group>

                    <b-form-group :label="$t('product.category')">
                      <v-select
                        :scrollable="true"
                        label="name"
                        v-model="newItem.category"
                        :options="categories"
                      >
                        <span slot="no-options" class="text-right w-100">
                          Add new Category
                          <b-button
                            size="xs"
                            @click="$modal.show('modalAddCategory')"
                            variant="outline-primary"
                          >Create category</b-button>
                        </span>
                        <template slot="option" slot-scope="option">{{ option.name }}</template>
                      </v-select>
                    </b-form-group>
                  </b-form>

                  <b-form-group>
                    <div class="float-sm-right">
                      <b-button
                        v-if="newItem.id"
                        @click="deleteProduct"
                        variant="danger"
                        size="lg"
                        style="margin:5px"
                      >{{$t('button.delete')}}</b-button>
                      <b-button
                        @click="$modal.hide('modalAddProduct')"
                        variant="outline-secondary"
                        size="lg"
                        style="margin:5px"
                      >{{$t('layouts.cancel')}}</b-button>
                      <b-button
                        @click="addNewItem"
                        variant="primary"
                        :disabled="processing"
                        size="lg"
                        style="margin:5px"
                      >
                        <i v-if="processing" class="loader"></i>
                        <span
                          v-if="!processing"
                        >{{newItem.id? $t('button.edit') : $t('button.add')}}</span>
                      </b-button>
                    </div>
                  </b-form-group>
                </div>
              </modal>
              <!-- End of Add Product Modal -->
              <!-- Add Category Modal -->
              <modal height="auto" :adaptive="true" name="modalAddCategory">
                <div style="padding:30px">
                  <div>
                    <b-row>
                      <b-colxx cols="8">
                        <h1>{{$t('category.title')}}</h1>
                      </b-colxx>
                      <b-colxx cols="4" class="text-right">
                        <a href="#" @click="$modal.hide('modalAddCategory')">
                          <h1>
                            <i class="simple-icon-close"></i>
                          </h1>
                        </a>
                      </b-colxx>
                    </b-row>
                  </div>
                  <b-form-group :label="$t('category.name')">
                    <b-form-input v-model="newCategory.name" />
                  </b-form-group>
                  <b-form-group>
                    <div class="float-sm-right">
                      <b-button
                        @click="closeModalCategory"
                        variant="light"
                        size="lg"
                      >{{$t('layouts.cancel')}}</b-button>
                      <b-button
                        @click="addNewCategory"
                        variant="primary"
                        :disabled="processing"
                        size="lg"
                      >
                        <i v-if="processing" class="loader"></i>
                        <span v-if="!processing">{{$t('button.add')}}</span>
                      </b-button>
                    </div>
                  </b-form-group>
                </div>
              </modal>
              <!-- End of Add Category Modal -->
            </div>
            <div class="mb-2 mt-2">
              <b-button
                variant="empty"
                class="pt-0 pl-0 d-inline-block d-md-none"
                v-b-toggle.displayOptions
              >
                {{ $t('layouts.display-options') }}
                <i class="simple-icon-arrow-down align-middle" />
              </b-button>
              <b-collapse id="displayOptions" class="d-md-block">
                <span class="mr-3 mb-2 d-inline-block float-md-left">
                  <a
                    :class="{'mr-2 view-icon':true,'active': displayMode==='list'}"
                    @click="changeDisplayMode('list')"
                  >
                    <data-list-icon />
                  </a>
                </span>
                <div class="d-block d-md-inline-block mb-2">
                  <b-dropdown
                    id="ddown1"
                    :text="`${$t('layouts.orderby')} ${sort.label}`"
                    variant="outline-dark"
                    class="mr-1 float-md-left btn-group"
                    size="xs"
                  >
                    <b-dropdown-item
                      v-for="(order,index) in sortOptions"
                      :key="index"
                      @click="changeOrderBy(order)"
                    >{{ order.label }}</b-dropdown-item>
                  </b-dropdown>

                  <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                    <b-input :placeholder="$t('menu.search')" v-model="search" />
                  </div>
                </div>
                <div class="float-md-right">
                  <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ total }}</span>
                  <b-dropdown
                    id="ddown2"
                    right
                    :text="`${perPage}`"
                    variant="outline-dark"
                    class="d-inline-block"
                    size="xs"
                  >
                    <b-dropdown-item
                      v-for="(size,index) in pageSizes"
                      :key="index"
                      @click="changePageSize(size)"
                    >{{ size }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-collapse>
            </div>
            <div class="separator mb-5" />
            <b-modal
              id="modalright"
              ref="modalright"
              :title="$t('product.product-details')"
              class="modal-right"
            >
              <div v-if="selectedItem">
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.name')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.description')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.description}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.quantity')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.unit}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.price')}}</p>
                        <p
                          class="list-item-heading mb-1"
                        >Tsh {{selectedItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} /=</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.sellPrice')}}</p>
                        <p
                          class="list-item-heading mb-1"
                        >Tsh {{selectedItem.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} /=</p>
                      </div>
                    </div>
                  </div>
                </div>-->
                <!-- <div class="mb-3 pb-3 border-bottom border-bottom">
                  <p class="mb-1 text-muted text-small">Packages</p>
                  <b-card class="mb-4 d-flex flex-row" no-body>
                    <div class="d-flex flex-grow-1 min-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Package</p>
                          <h6
                            class="mb-1 card-subtitle truncate"
                          >{{selectedItem.quantity}} {{selectedItem.unit}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Sell Price</p>
                          <h6 class="mb-1 card-subtitle truncate">Tsh {{selectedItem.sellPrice}}</h6>
                        </div>
                      </div>
                    </div>
                  </b-card>
                </div>-->

                <div v-if="selectedItem.serial" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.serial')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.serial}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.category" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.category')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.category.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="selectedItem.shop" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.shop-name')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.shop.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>-->
                <!-- <div v-if="selectedItem.supplier" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.supplier')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.supplier.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>-->
                <div
                  v-if="selectedItem.taxPercentage"
                  class="mb-3 pb-3 border-bottom border-bottom"
                >
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.taxPercentage')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.taxPercentage}} %</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('product.createdAt')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.createdAt | humanDate}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalright')"
                >{{ $t('layouts.cancel') }}</b-button>
                <b-button
                  variant="primary"
                  class="mr-1"
                  @click="showEditProductModal()"
                >{{$t('button.edit')}}</b-button>
              </template>
            </b-modal>
          </b-colxx>
        </b-row>
        <template v-if="isLoad">
          <b-row key="list">
            <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
              <data-list-item
                :key="item.id"
                :data="item"
                :selected-items="selectedItems"
                @toggle-item="toggleItem"
                @click-item="clickItem"
                v-contextmenu:contextmenu
              />
            </b-colxx>
          </b-row>
          <b-row v-if="lastPage>1">
            <b-colxx xxs="12">
              <b-pagination-nav
                :number-of-pages="lastPage"
                :link-gen="linkGen"
                v-model="page"
                :per-page="perPage"
                align="center"
                next-text="<i class='simple-icon-arrow-right' />"
                prev-text="<i class='simple-icon-arrow-left' />"
                first-text="<i class='simple-icon-control-start' />"
                last-text="<i class='simple-icon-control-end' />"
              />
            </b-colxx>
          </b-row>
        </template>
        <template v-else>
          <div class="loading"></div>
        </template>
        <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
          <v-contextmenu-item @click="onContextCopy()">
            <i class="simple-icon-docs" />
            <span>Copy</span>
          </v-contextmenu-item>
          <v-contextmenu-item @click="onContextArchive()">
            <i class="simple-icon-drawer" />
            <span>Move to archive</span>
          </v-contextmenu-item>
          <v-contextmenu-item @click="onContextDelete()">
            <i class="simple-icon-trash" />
            <span>Delete</span>
          </v-contextmenu-item>
        </v-contextmenu>
      </b-col>
    </b-row>
  </b-colxx>
</template>
<script>
import { DataListIcon, ThumbListIcon, ImageListIcon } from "components/Svg";
import vSelect from "vue-select";
import DataListItem from "components/Listing/Product/DataListItem";
import productApi from "../../../api/product";
import shopApi from "../../../api/shop";
import supplierApi from "../../../api/supplier";

let moment = require("moment");
export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    DataListItem
  },
  data() {
    return {
      isLoad: false,
      processing: false,
      displayMode: "list",
      sort: { column: "createdAt", label: "Date Added" },
      sortOptions: [{ column: "createdAt", label: "Date Added" }],
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      pageSizes: [4, 8, 12],
      selectedItems: [],
      shops: [],
      selectedShop: null,
      categories: [],
      selectedCategory: null,
      newCategory: {},
      packages: [],
      selectedPackage: {},
      selectedItem: null,
      statuses: [
        { text: "ON HOLD", value: "ON HOLD" },
        { text: "PROCESSED", value: "PROCESSED" }
      ],
      newItem: {},
      selectedSupplier: null,
      suppliers: [],
      selectedPredefinedProduct: null,

      newPreProduct: {},
      selectedPreCategory: null
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      if (this.apiUrl !== undefined)
        productApi.list(this.apiUrl).then(res => {
          this.total = res.data.total;
          this.lastPage = Math.ceil(
            this.total / this.perPage < 1 ? 1 : this.total / this.perPage
          );
          this.items = res.data.products;
          this.selectedItems = [];
          shopApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.shops = results.data.shops;
            });
          productApi
            .listCategories(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.categories = results.data.categories;
            });
          supplierApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.suppliers = results.data.suppliers;
            });

          this.isLoad = true;
        });
    },
    callAddModal() {
      this.newItem = {
        isCreditable: false
      };
      this.$modal.show("modalAddProduct");
    },
    showPredefinedProductModal() {
      this.$modal.show("modalAddToShop");
    },
    showCategoryModal() {
      this.$modal.hide("modalAddToShop");
      this.$modal.show("modalAddCategory");
    },
    closeModalCategory() {
      this.$modal.hide("modalAddCategory");
      this.$modal.show("modalAddToShop");
    },

    deleteProduct() {
      this.processing = true;
      let items = [];
      items.push(this.newItem.id);
      productApi
        .delete({ items: items })
        .then(res => {
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddProduct");
          this.$notify(
            "success",
            "Deleted Successfully",
            `Product deleted successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          this.processing = false;
          console.log(error);
          this.$notify("error", "Error!", error.message, {
            duration: 3000,
            permanent: false
          });
        });
    },
    showEditProductModal() {
      this.newItem = this.selectedItem;
      this.selectedCategory = this.selectedItem.category;

      this.$modal.show("modalAddProduct");
      this.$refs.modalright.hide();
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.perPage = perPage;
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    addNewCategory() {
      this.processing = true;
      productApi
        .createCategory(this.newCategory)
        .then(res => {
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddCategory");
          // this.categories.push(res.data);
          this.$notify(
            "success",
            "Success",
            `${res.data.name} created successfully`,
            { duration: 3000, permanent: false }
          );
          this.$modal.show("modalAddToShop");
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
          this.$modal.hide("modalAddCategory");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
          this.$modal.show("modalAddToShop");
        });
    },
    onSelectedProduct(selectedPredefinedProduct) {
      this.$set(this.newItem.name, this.selectedPredefinedProduct.name);
      this.$set(
        this.newItem.description,
        this.selectedPredefinedProduct.description
      );
    },
    addToShopMethod() {
      this.processing = true;

      productApi
        .addToShop({
          productId: this.selectedItem.id,
          shopId: this.selectedShop.id
        })
        .then(res => {
          console.log(res.data);
          this.processing = false;
          this.loadItems();
          this.$modal.hide("modalAddToShop");
          // this.preproducts.push(res.data);
          this.$notify(
            "success",
            "Success",
            `${res.data.name} created successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
          this.$modal.hide("modalAddToShop");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },
    addNewItem() {
      let data = Object.assign({}, this.newItem);
      data.category = data.category.id;
      this.processing = true;
      if (data.hasOwnProperty("id")) {
        productApi
          .update(data)
          .then(res => {
            console.log(res);
            this.processing = false;
            this.loadItems();
            data = {
              isCreditable: false
            };
            this.$modal.hide("modalAddProduct");
            this.$notify(
              "success",
              "Updated Successfully",
              `${res.data[0].name} updated successfully`,
              { duration: 3000, permanent: false }
            );
          })
          .catch(error => {
            console.log(error);
            this.processing = false;
            this.$modal.hide("modalAddProduct");
            this.$notify("error", "Error!", `Error occurred`, {
              duration: 3000,
              permanent: false
            });
          });
      } else {
        productApi
          .create(data)
          .then(res => {
            console.log(res);
            this.processing = false;
            this.loadItems();
            this.$modal.hide("modalAddProduct");
            this.$notify(
              "success",
              "Created Successfully",
              `${res.data.name} created successfully`,
              { duration: 3000, permanent: false }
            );
          })
          .catch(error => {
            console.log(error);
            this.processing = false;
            this.$modal.hide("modalAddProduct");
            this.$notify("error", "Error!", `Error occurred`, {
              duration: 3000,
              permanent: false
            });
          });
      }
    },
    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x != itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    clickItem(event, item) {
      this.selectedItem = item;
      this.$refs.modalright.show();
    },
    handleContextmenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextCopy() {
      console.log(
        "context menu item clicked - Copy Items: ",
        this.selectedItems
      );
    },
    onContextArchive() {
      console.log(
        "context menu item clicked - Move to Archive Items: ",
        this.selectedItems
      );
    },
    onContextDelete() {
      console.log(
        "context menu item clicked - Delete Items: ",
        this.selectedItems
      );
    },
    linkGen(pageNum) {
      return "#page-" + pageNum;
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
    apiUrl() {
      let skip = this.page === 1 ? 0 : (this.page - 1) * this.perPage;
      if (this.perPage !== undefined)
        return `?sortBy='${this.sort.column}'&sortOrder=DESC&skip=${skip}&limit=${this.perPage}`;
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  },
  mounted() {
    this.loadItems();
  },
  filters: {
    humanDate(val) {
      let date = moment(val).format("MM-DD-YYYY hh:mm a");
      return date;
    }
  }
};
</script>
<style>
.v--modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999 !important;
  opacity: 1;
}
.margin-bottom {
  margin-bottom: 15px;
}
</style>
