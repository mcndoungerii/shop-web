<template>
  <b-colxx class>
    <b-row>
      <b-col>
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('menu.shops') }}</h1>
            <piaf-breadcrumb />
            <div class="float-sm-right">
              <b-button
                style="width: 100%;"
                @click="showAddShop"
                variant="primary"
                size="lg"
                class="top-right-button"
              >{{ $t('shops.add-shop') }}</b-button>
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
              :title=" $t('shops.shop-details')"
              class="modal-right"
            >
              <div v-if="selectedItem">
                <div class="mb-4 d-flex flex-row" no-body>
                  <div v-if="selectedItem.id" class="d-flex flex-grow-1 min-width-zero mt-3 mb-3">
                    <div
                      class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="mb-1 text-muted text-small">{{$t('shops.id')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.id}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.name" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.name')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.address" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.address')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.address}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.tin" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.tinNumber')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.tin}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="selectedItem.businessLicense"
                  class="mb-3 pb-3 border-bottom border-bottom"
                >
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.businessLicense')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.businessLicense}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.suppliers" class="mb-3 pb-3 border-bottom border-bottom">
                  <p class="mb-1 text-muted text-small">{{$t('shops.suppliers')}}</p>
                  <b-card
                    v-for="(supplier,index) in selectedItem.suppliers"
                    :key="index.id"
                    class="mb-4 d-flex flex-row"
                    no-body
                  >
                    <b-col>
                      <div class="d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                        >
                          <div class="min-width-zero">
                            <p class="text-muted text-small mb-2">{{$t('shops.supplier')}}</p>
                            <h6 class="mb-1 card-subtitle truncate">{{supplier.name}}</h6>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                        >
                          <div class="min-width-zero">
                            <p class="text-muted text-small mb-2">{{$t('shops.contact')}}</p>
                            <h6 class="mb-1 card-subtitle truncate">{{supplier.contact}}</h6>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-card>
                </div>
                <div v-if="selectedItem.region" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.region')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.region}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.district" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.district')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.district}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.ward" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.ward')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.ward}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.village" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.village')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.village}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedItem.contact" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.contact')}}</p>
                        <p class="list-item-heading mb-1">{{selectedItem.contact}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-3 pb-3 border-bottom border-bottom">
                  <p class="mb-1 text-muted text-small">{{$t('shops.users')}}</p>
                  <b-card
                    v-for="(user,index) in selectedItem.users"
                    :key="index.id"
                    class="mb-4 d-flex flex-row"
                    no-body
                  >
                    <b-col>
                      <div class="d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                        >
                          <div class="min-width-zero">
                            <p class="text-muted text-small mb-2">{{$t('shops.user')}}</p>
                            <h6 class="mb-1 card-subtitle truncate">{{user.fullName}}</h6>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="d-flex flex-grow-1 min-width-zero">
                        <div
                          class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                        >
                          <div class="min-width-zero">
                            <p class="text-muted text-small mb-2">{{$t('shops.contact')}}</p>
                            <h6 class="mb-1 card-subtitle truncate">{{user.phone}}</h6>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-card>
                </div>
                <div v-if="selectedItem.createdAt" class="mb-3 pb-3 border-bottom border-bottom">
                  <div class="pl-0 mb-15 d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-0 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
                    >
                      <div class="w-40 w-sm-100">
                        <p class="mb-1 text-muted text-small">{{$t('shops.createdAt')}}</p>
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
                  @click="showEditShop()"
                >{{ $t('button.edit') }}</b-button>
              </template>
            </b-modal>

            <!-- Add Shop Modal -->
            <modal height="auto" :scrollable="true" :adaptive="true" name="addShopModal">
              <div style="padding:30px">
                <div>
                  <b-row>
                    <b-colxx cols="8">
                      <h1>{{newItem.hasOwnProperty("id")? $t('shops.edit-shop') : $t('shops.add-shop')}}</h1>
                    </b-colxx>
                    <b-colxx cols="4" class="text-right">
                      <a href="#" @click="$modal.hide('addShopModal')">
                        <h1>
                          <i class="simple-icon-close"></i>
                        </h1>
                      </a>
                    </b-colxx>
                  </b-row>
                </div>

                <b-row>
                  <b-col>
                    <b-form-group :label="$t('shops.name')">
                      <b-form-input v-model="newItem.name" />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group :label="$t('shops.address')">
                      <b-form-input v-model="newItem.address" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group :label="$t('shops.tinNumber')">
                      <b-form-input v-model="newItem.tin" />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group :label="$t('shops.businessLicense')">
                      <b-form-input v-model="newItem.businessLicense" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group :label="$t('shops.region')">
                      <b-form-input v-model="newItem.region" />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group :label="$t('shops.district')">
                      <b-form-input v-model="newItem.district" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-card
                  v-for="(supplier,index) in newItem.suppliers"
                  :key="index"
                  class="mb-4 d-flex flex-row"
                  no-body
                >
                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="text-muted text-small mb-2">{{$t('shops.supplier')}}</p>
                        <h6 class="mb-1 card-subtitle truncate">{{supplier.name}}</h6>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="text-muted text-small mb-2">{{$t('shops.contact')}}</p>
                        <h6 class="mb-1 card-subtitle truncate">{{supplier.contact}}</h6>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <b-button
                          size="xs"
                          @click="removeSupplier(index)"
                          variant="outline-danger"
                        >{{$t('button.delete')}}</b-button>
                      </div>
                    </div>
                  </div>
                </b-card>
                <b-form-group v-if="newItem.id">
                  <b-button
                    @click="showSupplierModal"
                    class="mb-2"
                    block
                    variant="primary"
                  >{{$t('button.add-supplier')}}</b-button>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-form-group :label="$t('shops.ward')">
                      <b-form-input v-model="newItem.ward" />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group :label="$t('shops.village')">
                      <b-form-input v-model="newItem.village" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group :label="$t('shops.contact')">
                      <b-form-input v-model="newItem.contact" />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-card
                  v-for="(user,i) in newItem.users"
                  :key="i"
                  class="mb-4 d-flex flex-row"
                  no-body
                >
                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="text-muted text-small mb-2">{{$t('button.add-user')}}</p>
                        <h6 class="mb-1 card-subtitle truncate">{{user.fullName}}</h6>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="text-muted text-small mb-2">{{$t('shops.contact')}}</p>
                        <h6 class="mb-1 card-subtitle truncate">{{user.phone}}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="text-muted text-small mb-2">{{$t('shops.role')}}</p>
                        <h6 class="mb-1 card-subtitle truncate">{{user.role}}</h6>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="p-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <b-button
                          size="xs"
                          @click="removeUser(i)"
                          variant="outline-danger"
                        >{{$t('button.delete')}}</b-button>
                      </div>
                    </div>
                  </div>
                </b-card>
                <b-form-group v-if="newItem.id">
                  <b-button
                    @click="showUserModal"
                    class="mb-2"
                    block
                    variant="primary"
                  >{{$t('button.add-user')}}</b-button>
                </b-form-group>
                <b-form-group>
                  <div class="float-sm-right">
                    <b-button
                      v-if="newItem.id"
                      @click="deleteShop"
                      variant="danger"
                      size="lg"
                      style="margin:5px"
                    >{{$t('button.delete')}}</b-button>
                    <b-button
                      @click="$modal.hide('addShopModal')"
                      variant="light"
                      size="lg"
                      style="margin:5px"
                    >{{$t('layouts.cancel')}}</b-button>
                    <b-button
                      @click="addShop"
                      variant="primary"
                      :disabled="processing"
                      size="lg"
                      style="margin:5px"
                    >
                      <i v-if="processing" class="loader"></i>
                      <span
                        v-if="!processing"
                      >{{newItem.hasOwnProperty("id")? $t('shops.edit'):$t('shops.add')}}</span>
                    </b-button>
                  </div>
                </b-form-group>
              </div>
            </modal>
            <!-- End of Add Shop Modal -->

            <!-- Start of  add Supplier SubModal -->
            <modal :scrollable="true" height="auto" :adaptive="true" name="addSupplierModal">
              <div style="padding:30px">
                <div>
                  <b-row>
                    <b-colxx cols="8">
                      <h1>Add Suppliers</h1>
                    </b-colxx>
                    <b-colxx cols="4" class="text-right">
                      <a href="#" @click="closeSuppliersModal">
                        <h1>
                          <i class="simple-icon-close"></i>
                        </h1>
                      </a>
                    </b-colxx>
                  </b-row>
                </div>
                <div>
                  <b-form-group label="Supplier">
                    <v-select label="name" v-model="selectedSupplier" :options="suppliers">
                      <template slot="option" slot-scope="option">{{ option.name }}</template>
                    </v-select>
                  </b-form-group>
                </div>
                <b-form-group>
                  <div class="float-sm-right">
                    <b-button @click="closeSuppliersModal" variant="light" size="lg">Cancel</b-button>
                    <b-button @click="saveSupplier" variant="primary" size="lg">
                      <span>Save</span>
                    </b-button>
                  </div>
                </b-form-group>
              </div>
            </modal>
            <!--End of add Supplier SubModal -->

            <!-- Start of  add User SubModal -->
            <modal :scrollable="true" height="auto" :adaptive="true" name="addUserModal">
              <div style="padding:30px">
                <div>
                  <b-row>
                    <b-colxx cols="8">
                      <h1>Add Users</h1>
                    </b-colxx>
                    <b-colxx cols="4" class="text-right">
                      <a href="#" @click="closeUsersModal">
                        <h1>
                          <i class="simple-icon-close"></i>
                        </h1>
                      </a>
                    </b-colxx>
                  </b-row>
                </div>
                <div>
                  <b-form-group label="User">
                    <v-select label="fullName" v-model="selectedUser" :options="users">
                      <template slot="option" slot-scope="option">{{ option.fullName }}</template>
                    </v-select>
                  </b-form-group>
                </div>
                <b-form-group>
                  <div class="float-sm-right">
                    <b-button @click="closeUsersModal" variant="light" size="lg">Cancel</b-button>
                    <b-button @click="saveUser" variant="primary" size="lg">
                      <span>Save</span>
                    </b-button>
                  </div>
                </b-form-group>
              </div>
            </modal>
            <!--End of add User SubModal -->
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
import DataListItem from "components/Listing/Shop/DataListItem";
import shopApi from "../../../api/shop";
import supplierApi from "../../../api/supplier";
import userApi from "../../../api/user";

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
      sortShop: { column: "createdAt", label: "Shop Added" },
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

      newItem: {},
      shops: [],
      selectedSupplier: null,
      suppliers: [],
      selectedUser: null,
      users: []
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      if (this.apiUrl !== undefined)
        shopApi.list(this.apiUrl).then(res => {
          this.total = res.data.total;
          this.lastPage = Math.ceil(
            this.total / this.perPage < 1 ? 1 : this.total / this.perPage
          );
          this.items = res.data.shops;
          this.selectedItems = [];
          supplierApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.suppliers = results.data.suppliers;
            });
          userApi
            .list(`?sortBy=createdAt&sortOrder=DESC&skip=0&limit=100`)
            .then(results => {
              this.users = results.data.users;
            });
          this.isLoad = true;
        });
    },
    showAddShop() {
      this.newItem = {};
      this.$modal.show("addShopModal");
    },
    showEditShop() {
      this.newItem = this.selectedItem;
      this.$modal.show("addShopModal");
      this.$refs.modalright.hide();
    },
    // Supplier Methods
    showSupplierModal() {
      this.$modal.show("addSupplierModal");
    },
    closeSuppliersModal() {
      this.$modal.hide("addSupplierModal");
    },
    saveSupplier() {
      this.processing = true;
      let suppliers = [];
      suppliers.push(this.selectedSupplier.id);
      shopApi
        .addSupplier({
          suppliers: suppliers,
          shopId: this.selectedItem.id
        })
        .then(res => {
          this.processing = false;
          this.newItem.suppliers.push(this.selectedSupplier);
          this.$modal.hide("addSupplierModal");
          this.$notify(
            "success",
            "Added Successfully",
            `Supplier added successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          this.processing = false;
          console.log(error);
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },
    removeSupplier(index) {
      this.processing = true;
      this.$forceUpdate();
      shopApi
        .deleteSupplier({
          suppliers: this.newItem.suppliers[index].id,
          shopId: this.selectedItem.id
        })
        .then(res => {
          this.processing = false;
          this.newItem.suppliers.splice(index, 1);
          this.$notify(
            "success",
            "Deleted Successfully",
            `Supplier deleted successfully`,
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
    // End of Supplier Methods

    // Start of User Methods
    showUserModal() {
      this.$modal.show("addUserModal");
    },
    closeUsersModal() {
      this.$modal.hide("addUserModal");
    },
    saveUser() {
      this.processing = true;
      let users = [];
      users.push(this.selectedUser.id);

      shopApi
        .addUser({
          users: users,
          shopId: this.selectedItem.id
        })
        .then(res => {
          this.processing = false;
          this.newItem.users.push(this.selectedUser);
          this.$modal.hide("addUserModal");
          this.$notify(
            "success",
            "Added Successfully",
            `User added successfully`,
            { duration: 3000, permanent: false }
          );
        })
        .catch(error => {
          this.processing = false;
          console.log(error);
          this.$notify("error", "Error!", `Error occurred`, {
            duration: 3000,
            permanent: false
          });
        });
    },
    removeUser(i) {
      this.processing = true;
      shopApi
        .deleteUser({
          users: this.newItem.users[i].id,
          shopId: this.selectedItem.id
        })
        .then(res => {
          this.processing = false;
          this.newItem.users.splice(i, 1);
          this.$notify(
            "success",
            "Deleted Successfully",
            `User deleted successfully`,
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
    // End of User Methods

    deleteShop() {
      this.processing = true;
      let items = [];
      items.push(this.newItem.id);
      shopApi
        .delete({ items: items })
        .then(res => {
          this.processing = false;
          this.loadItems();
          this.$modal.hide("addShopModal");
          this.$notify(
            "success",
            "Deleted Successfully",
            `Shop deleted successfully`,
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
    addShop() {
      this.processing = true;
      let data = Object.assign({}, this.newItem);
      if (data.hasOwnProperty("id")) {
        data.user = this.newItem.user.id;

        delete data.suppliers;
        delete data.users;

        shopApi
          .update(data)
          .then(res => {
            console;
            this.processing = false;
            this.$modal.hide("addShopModal");
            this.loadItems();
            this.$notify(
              "success",
              "Updated Successfully",
              `Shop updated successfully`,
              { duration: 3000, permanent: false }
            );
          })
          .catch(error => {
            this.processing = false;
            this.$modal.hide("addShopModal");
            this.$notify("error", "Error!", `Error occurred`, {
              duration: 3000,
              permanent: false
            });
          });
      } else {
        shopApi
          .create(data)
          .then(res => {
            this.processing = false;
            this.$modal.hide("addShopModal");
            this.loadItems();
            this.$notify(
              "success",
              "Added Successfully",
              `Shop added successfully`,
              { duration: 3000, permanent: false }
            );
          })
          .catch(error => {
            this.processing = false;
            this.$modal.hide("addShopModal");
            this.$notify("error", "Error!", `Error occurred`, {
              duration: 3000,
              permanent: false
            });
          });
      }
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
    filterShop(shop) {},

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