<template>
  <b-colxx class>
    <b-row>
      <b-col>
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('menu.orders') }}</h1>
            <piaf-breadcrumb />
            <!-- <div class="float-sm-right">
              <b-button
                style="width: 100%;"
                @click="showAddSale"
                variant="primary"
                size="lg"
                class="top-right-button"
              >Create an Order</b-button>
            </div> -->
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
            <b-modal id="modalright" ref="modalright" :title="'Order Details'" class="modal-right" >
              <div v-if="selectedItem">
                <div class="mb-4 d-flex flex-row" no-body>
                  <div v-if="selectedItem.id" class="d-flex flex-grow-1 min-width-zero mt-3 mb-3">
                    <div
                      class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="mb-1 text-muted text-small">Order ID</p>
                        <p class="list-item-heading mb-1">{{selectedItem.id}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="selectedItem.branch" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Branch</p>
                        <p class="list-item-heading mb-1">{{selectedItem.branch.name}}</p>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div v-if="selectedItem.user" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">User</p>
                        <p class="list-item-heading mb-1">{{selectedItem.user.fullName}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.toRole" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Order To Role</p>
                        <p class="list-item-heading mb-1">{{selectedItem.toRole}}</p>
                      </div>
                    </div>
                  </div>
                </div>
             
                <div v-if="selectedItem.isLoan" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class>
                        <p class="mb-1 text-muted text-small">Loan</p>
                        <b-badge
                          pill
                          :variant="selectedItem.isLoan?'success':'danger'"
                        >{{ selectedItem.isLoan? 'True': 'False' }}</b-badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="selectedItem.modeOfPayment"
                  class="mb-3 pb-3 border-bottom border-bottom"
                >
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Mode Of Payment</p>
                        <p class="list-item-heading mb-1">{{selectedItem.modeOfPayment}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div>
                        <p class="mb-1 text-muted text-small">Order status</p>
                        <p class="list-item-heading mb-1">{{selectedItem.status}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="selectedItem.orderEscalationLevel"
                  class="mb-3 pb-3 border-bottom border-bottom"
                >
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Order Escalation Level</p>
                        <p class="list-item-heading mb-1">{{selectedItem.orderEscalationLevel}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mb-3 pb-3 border-bottom border-bottom" style="width: 100%;">
                  <p class="mb-1 text-muted text-small">Order Details</p>
                  <b-card
                    v-for="(detail,index) in selectedItem.orderDetails"
                    :key="index"
                    class="mb-4 d-flex flex-row"
                    no-body
                    
                  >
                    <div class="d-flex flex-grow-1 max-width-zero" >
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Product</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.product.name}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 max-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Quantity</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.quantity}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 max-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Price</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.price}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 max-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Total</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.total}}</h6>
                        </div>
                      </div>
                    </div>
                  </b-card>
                </div>
                <div v-if="selectedItem.tax" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Tax</p>
                        <p class="list-item-heading mb-1">Tsh {{selectedItem.tax}}/=</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.subTotal" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Sub Total</p>
                        <p class="list-item-heading mb-1">{{selectedItem.subTotal}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.total" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Total</p>
                        <p class="list-item-heading mb-1">{{selectedItem.total}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.customer" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Customer</p>
                        <p
                          class="list-item-heading mb-1"
                        >{{selectedItem.customer.firstName}} {{selectedItem.customer.lastName}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="selectedItem.createdAt" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Order Created</p>
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
                <b-button variant="primary" class="mr-1" @click="showViewOrder()">View Order</b-button>
              </template>
            </b-modal>

            <!-- Add Sale Modal -->
            <modal height="auto" :scrollable="true" :adaptive="true" name="viewOrderModal">
              <div v-if="viewItem" style="padding:30px">
                <div>
                  <b-row>
                    <b-colxx cols="8">
                      <h1>{{'View Sale'}}</h1>
                    </b-colxx>
                    <b-colxx cols="4" class="text-right">
                      <a href="#" @click="$modal.hide('viewOrderModal')">
                        <h1>
                          <i class="simple-icon-close"></i>
                        </h1>
                      </a>
                    </b-colxx>
                  </b-row>
                </div>

                <b-row>
                  <b-col>
                    <div class="mb-4 d-flex flex-row" no-body>
                      <div class="d-flex flex-grow-1 min-width-zero mt-3 mb-3">
                        <div
                          class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                        >
                          <div class="min-width-zero">
                            <p class="mb-1 text-muted text-small">Sale ID</p>
                            <p class="list-item-heading mb-1">{{viewItem.id}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">User</p>
                            <p class="list-item-heading mb-1">{{viewItem.user.fullName}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <div v-if="viewItem.branch" class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">Branch</p>
                            <p class="list-item-heading mb-1">{{viewItem.branch.name}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>

                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">Loan</p>
                            <b-badge
                              pill
                              :variant="viewItem.isLoan?'success':'danger'"
                            >{{ viewItem.isLoan? 'True': 'False' }}</b-badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <p class="mb-1 text-muted text-small">Order Details</p>
                  <b-card
                    v-for="(detail,index) in viewItem.orderDetails"
                    :key="index"
                    class="mb-4 d-flex flex-row"
                    no-body
                  >
                    <div class="d-flex flex-grow-1 min-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Product</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.product.name}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Quantity</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.quantity}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Price</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.price}}</h6>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero">
                      <div
                        class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                      >
                        <div class="min-width-zero">
                          <p class="text-muted text-small mb-2">Total</p>
                          <h6 class="mb-1 card-subtitle truncate">{{detail.total}}</h6>
                        </div>
                      </div>
                    </div>
                  </b-card>
                </div>
                <b-row>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">Mode Of Payment</p>
                            <p class="list-item-heading mb-1">{{viewItem.modeOfPayment}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">Status</p>
                            <p class="list-item-heading mb-1">{{viewItem.status}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>

                  <!-- <div v-if="selectedItem.customer" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Customer</p>
                        <p
                          class="list-item-heading mb-1"
                        >{{selectedItem.customer.firstName}} {{selectedItem.customer.lastName}}</p>
                      </div>
                    </div>
                  </div>
                  </div>-->
                </b-row>
                <b-row>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">Tax</p>
                            <p class="list-item-heading mb-1">Tsh {{viewItem.tax}}/=</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">To Role</p>
                            <p class="list-item-heading mb-1">{{viewItem.toRole}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">Order Escalation Level</p>
                            <p class="list-item-heading mb-1">{{viewItem.orderEscalationLevel}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="mb-3 pb-3 border-bottom border-bottom">
                      <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                        >
                          <div class="w-40 w-sm-100">
                            <p class="mb-1 text-muted text-small">SubTotal</p>
                            <p class="list-item-heading mb-1">{{viewItem.subTotal}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">Total</p>
                        <p class="list-item-heading mb-1">{{viewItem.total}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <b-form-group label="Confirm Order">
                  <b-form-radio-group
                    id="radio-slots"
                    v-model="viewItem.status"
                    :options="options"
                    name="radio-options-slots"
                  >
                  
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group>
                  <div class="float-sm-right">
                    <b-button @click="$modal.hide('viewOrderModal')" variant="light" size="lg">Cancel</b-button>
                    <b-button
                      @click="processOrder"
                      variant="primary"
                      :disabled="processing"
                      size="lg"
                    >
                      <i v-if="processing" class="loader"></i>
                      <span v-if="!processing">Process</span>
                    </b-button>
                  </div>
                </b-form-group>
              </div>
            </modal>
            <!-- End of Add Sale Modal -->
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
import Switches from "vue-switches";
import DataListItem from "components/Listing/Order/DataListItem";
import orderApi from "../../../api/order";
import customerApi from "../../../api/customer";
import userApi from "../../../api/user";
import productApi from "../../../api/product";
import orderDetailApi from "../../../api/orderDetail";

let moment = require("moment");
export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    Switches,
    DataListItem
  },
  data() {
    return {
      isLoad: false,
      processing: false,
      displayMode: "list",
      sort: { column: "createdAt", label: "Date Added" },
      sortOptions: [{ column: "createdAt", label: "Date Added" }],
      sortSale: { column: "createdAt", label: "Sale Added" },
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
      selectedItem: null,

      viewItem: null, 
      options: [
        { text: "Accept Order", value: "ACCEPTED" },
        { text: "Reject Order", value: "REJECTED" },
        { text: "Process Order", value: "PROCESSED" },
      ]
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      if (this.apiUrl !== undefined)
        orderApi.list(this.apiUrl).then(res => {
          this.total = res.data.total;
          this.lastPage = Math.ceil(
            this.total / this.perPage < 1 ? 1 : this.total / this.perPage
          );
          this.items = res.data.orders;
          this.selectedItems = [];
          
          this.isLoad = true;
        });
    },
    showViewOrder() {
      this.viewItem = this.selectedItem;
      this.$modal.show("viewOrderModal");
      this.$refs.modalright.hide();
    },
    processOrder() {
      this.processing = true;
      
      orderApi
        .update({id:this.viewItem.id, status:this.viewItem.status})
        .then(res => {
          console.log(res);
          this.processing = false;
          this.loadItems();
          
          this.$modal.hide("viewOrderModal");
          this.$notify(
            "success",
            "Updated Successfully",
            `${res.data[0].id} updated successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
          this.$modal.hide("viewOrderModal");
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
         
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

    selectAll(isToggle) {sale
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
        return `?sortBy='${
          this.sort.column
        }'&sortOrder=DESC&skip=${skip}&limit=${this.perPage}${
          this.search !== "" ? "&contains=" + this.search : ""
        }`;
    }
  },
  watch: {
    search() {
      this.loadItems();
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    },
    "$route.params.type"(to, from) {
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
  z-index: 999999 !important;
  opacity: 1;
}
</style>