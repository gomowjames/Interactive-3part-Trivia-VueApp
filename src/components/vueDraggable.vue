<template>
<section>
		
  <div v-drag-and-drop:options="options" class="drag-container">
    <ul class="drag-list">
      <li v-for="group in limitColumnLeft" :key="group.id" class="drag-column">
        <span class="drag-column-header">
          <h2>{{ group.name }}</h2>
          <h2>{{ group.id }}</h2>
        </span>
        <vue-draggable-group
          v-model="group.items"
          :groups="groups"
          :data-id="group.id"
          @change="onGroupsChange"
        >
          <ul class="drag-inner-list" :data-id="group.id">
            <li v-for="item in group.items" :key="item.id" class="drag-item" :data-id="item.id">
              <div class="drag-item-text">{{ item.name }}</div>
            </li>
          </ul>
        </vue-draggable-group>
      </li>
    </ul>

    <ul class="drag-list">
      <li v-for="group in limitColumnRight" :key="group.id" class="drag-column">
        <span class="drag-column-header">
          <h2>{{ group.name }}</h2>
          <h2>{{ group.id }}</h2>
        </span>
        <vue-draggable-group
          v-model="group.items"
          :groups="groups"
          :data-id="group.id"
          @change="onGroupsChange"
        >
          <ul class="drag-inner-list" :data-id="group.id">
            <li v-for="item in group.items" :key="item.id" class="drag-item" :data-id="item.id">
              <div class="drag-item-text">{{ item.name }}</div>
            </li>
          </ul>
        </vue-draggable-group>
      </li>
    </ul>
  </div>  
</section>
  
</template>

<script>
export default {
  data() {
    return {
      groups: [
        {
          id: 1,
          name: "Chandler",
          items: [
            { id: 1, name: "Chandler", groupId: 1 },
          ]
        },
        {
          id: 2,
          name: "Joey",
          items: [
            { id: 2, name: "Joey", groupId: 2 },
          ]
        },
        {
          id: 3,
          name: "Monica",
          items: [
            { id: 3, name: "Monica", groupId: 3 },
					]
        },
        {
          id: 4,
          name: "Phoebe",
          items: [
            { id: 4, name: "Phoebe", groupId: 4 },
					]
        },
        {
          id: 5,
          name: "Rachel",
          items: [
            { id: 5, name: "Rachel", groupId: 5 },
					]
        },
        {
          id: 6,
          name: "Ross",
          items: [
            { id: 6, name: "Ross", groupId: 6 },
					]
        }
      ],

      options: {
        dropzoneSelector: ".drag-inner-list",
        draggableSelector: ".drag-item"
      }
    }
  },

	computed: {
	  limitColumnLeft() {
	    return 3 ? this.groups.slice(0, 3) : this.groups
	  },
	  limitColumnRight() {
	    return 3 ? this.groups.slice(3, 6) : this.groups
	  },
  },

  methods: {
    onGroupsChange(e) {
      console.log({ e });
    }
  }
};
</script>

<style lang="scss">
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

* {
  box-sizing: border-box;
}

.drag-container {
  max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: rgba(black, 0.2);
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  user-select: none;
}

.drag-inner-list {
  height: 15vh;
  overflow: auto;
}

.drag-item {
  margin: 10px;
  height: 100px;
  background: rgba(black, 0.4);
  transition: $ease-out;

  /* items grabbed state */
  &[aria-grabbed="true"] {
    background: #5cc1a6;
    color: #fff;
  }

  .drag-item-text {
    font-size: 1rem;
    padding-left: 1rem;
    padding-top: 1rem;
  }
}

.drag-header-more {
  cursor: pointer;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
</style>