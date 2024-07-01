<template>
  <div class="storno">
    <div class="title ticket-container">
      <div class="stornoGrid ticket">
        <div class="ticket__id">
          <p>{{ storno.ticket?.bookingItem?.ticketType?.name }}</p>
          <p class="grayed-out id__padding">{{ storno.id }}</p>
          <p class="grayed-out id__padding">{{ storno.ticket?.bookingItem?.id }}</p>
        </div>
        <div class="customer-center">
          <p>{{ storno.booking?.customer?.email }}</p>
        </div>
        <div v-if="storno.ticket?.price" class="customer-center">
          <p>{{ (storno.ticket?.price / 100).toFixed(2)  }}€</p>
        </div>
        <div>
          <p>{{ dayjs(storno.requestedAt).format("DD.MM.YYYY H:mm") }}</p>
        </div>
        <div :id="{storno.id + "s"}">
          <p v-if="storno.status?.toString() === 'PENDING'" class="ticket-label pending">Ausstehend</p>
          <p v-if="storno.status?.toString() === 'ACCEPTED'" class="ticket-label accepted">Akzeptiert</p>
          <p v-if="storno.status?.toString() === 'DECLINED'" class="ticket-label declined">Abgelehnt</p>
        </div>
        <div id={{ storno.id.toString() }}>
          <div v-if="storno.status?.toString() === 'PENDING'" class="accept__BT">
            <input @click="
              startStornoResponse(
                storno.ticket?.bookingItem?.ticketType?.event?.id,
                storno.ticket?.id,
                storno.ticket?.price,
                storno.booking?.customer?.stripeId,
                true,
                storno.id)" class="textCenter">Akzeptieren</input>
          </div>
          <div v-if="storno.status?.toString() === 'PENDING'" class="decline__BT">
            <input @click="
              startStornoResponse(
                storno.ticket?.bookingItem?.ticketType?.event?.id,
                storno.ticket?.id,
                storno.ticket?.price,
                storno.booking?.customer?.stripeId,
                false,
                storno.id)" class="textCenter">Ablehnen</input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Storno} from '~/classes/Storno';
import dayjs from 'dayjs';
import { responseToProcessEngine } from '~/requests/storno';

const status: Ref<String | undefined> = ref(undefined);

defineProps<{
  storno: Storno
}>()

function startStornoResponse(eventId?: string, ticketId?: string, price?: number, kundenId?: string, response?: boolean, stornoId?: string) {

  var innerBT_HTML = "";
  if(stornoId){
    var btElem = document.getElementById(stornoId)
    if(btElem){
      innerBT_HTML = btElem.innerHTML;
      btElem.innerHTML = "<p>Prozess wurde angestoßen...</p>";
    }
  }

  let onSuccess = () => {
    if(stornoId){
      var btElem = document.getElementById(stornoId)
      if(btElem){
        btElem.innerHTML = "<p>Abgeschlossen</p>";
      }
    }
    if(response == true){
      var elemId = stornoid + "s"; 
      var statusElem = document.getElementById(elemId)
      if(statusElem){
        statusElem.innerHTML = "<p class='ticket-label accepted'>Akzeptiert</p>"
      }
    }
    else{
      var elemId = stornoid + "s";
      var statusElem = document.getElementById(elemId)
      if(statusElem){
        statusElem.innerHTML = "<p class='ticket-label declined'>Abgelehnt</p>"
      }
    }
  }

  let onError = () => {
    if(stornoId){
      var btElem = document.getElementById(stornoId)
      if(btElem){
        btElem.innerHTML = innerBT_HTML;
      }
    }
  }

  responseToProcessEngine(
                onSuccess,
                onError,
                eventId,
                ticketId,
                price,
                kundenId,
                response,
                stornoId)
}

</script>

<style scoped>
.ticket-label {
  background-color: black;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  color: white;
}

.accepted {
  background-color: #08d20f;
}

.pending {
  background-color: #a0a0a0;
}

.declined {
  background-color: #d21508;
}

.headline {
  padding: 10px 0px 0px 5px;
}

.textCenter {
  text-align: center;
}

.id__padding {
  padding: 5px 0px 5px 0px;
}

.stornoGrid {
  display: grid;
  grid-template-columns: 10rem 17rem 7rem 7rem 7rem 7rem;
  grid-auto-flow: column;
}

.accept__BT {
  margin: 5px 0px 5px 0px;
  border: 1.5px solid black;
  border-radius: 2.5rem;
}

.decline__BT {
  margin: 5px 0px 5px 0px;
  border: 1.5px solid black;
  border-radius: 2.5rem;
}

.decline__BT:hover {
  background-color: var(--primary-color);
  cursor: pointer;
}

.accept__BT:hover {
  background-color: lightgreen;
  cursor: pointer;
}

.customer-center {
  padding: 0px 0px 0px 10px;
}

.ticket-page {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
}

.ticket-container {
  margin: 5px;
  padding: 0px;
  display: grid;
  border-radius: 0.5rem;
  align-items: stretch;
  width: 100%;
  background-color: white;
}

.tickets {
  height: 100%;
  gap: 1rem;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: flex-start;
}

.ticket {
  padding: 0.25rem 0.75rem;
  gap: 0.25rem;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.ticket:last-child {
  border-bottom: 0px;
}

.ticket__id,
.ticket__property {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
}

.ticket__property {
  padding-left: 3rem;
}

.ticket:hover .ticket__id {
  border-left: 0.25rem solid var(--primary-color);
  padding-left: 0.75rem;
}

.ticket-status {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 576px) {
  .ticket-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .ticket > * {
    padding-left: 1rem;
    border-bottom: none;
  }

  .ticket > *:nth-of-type(3), .ticket > *:nth-of-type(4) {
    border-bottom: 1px solid lightgray;
  }

  .ticket:hover > .ticket > *:nth-of-type(1), .ticket:hover > *:nth-of-type(3) {
    border-left: 0.25rem solid var(--primary-color);
    padding-left: 0.75rem;
  }

  .ticket-status {
    display: flex;
    justify-content: flex-start;
  }
}
</style>