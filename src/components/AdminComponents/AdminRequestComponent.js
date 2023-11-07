import React, { useEffect } from 'react';
import AdminBaseLayout from '../layoutComponents/AdminBaseLayout';
import '../../assets/styles/PieChart.css';

const Requests = () => {
  useEffect(() => {
    function sliceSize(dataNum, dataTotal) {
      return (dataNum / dataTotal) * 360;
    }

    function addSlice(sliceSize, pieElement, offset, sliceID, color) {
      const pie = document.querySelector(pieElement);
      const slice = document.createElement('div');
      slice.className = `slice ${sliceID}`;
      slice.innerHTML = '<span></span>';
      pie.appendChild(slice);

      const offsetMinus = offset - 1;
      const sizeRotation = -179 + sliceSize;
      slice.style.transform = `rotate(${offsetMinus}deg) translate3d(0,0,0)`;
      slice.querySelector('span').style.cssText = `
        transform: rotate(${sizeRotation}deg) translate3d(0,0,0);
        background-color: ${color};
      `;
    }

    function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
      const sliceID = `s${dataCount}-${sliceCount}`;
      const maxSize = 179;
      if (sliceSize <= maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
      } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(
          sliceSize - maxSize,
          pieElement,
          offset + maxSize,
          dataCount,
          sliceCount + 1,
          color
        );
      }
    }

    function createPie(dataElement, pieElement) {
      const listData = Array.from(document.querySelectorAll(`${dataElement} span`)).map((span) => parseInt(span.textContent));
      const listTotal = listData.reduce((total, num) => total + num, 0);

      let offset = 0;
      const color = [
        'cornflowerblue',
        'olivedrab',
        'orange',
        'tomato',
        'crimson',
        'purple',
        'turquoise',
        'forestgreen',
        'navy',
        'gray',
      ];

      listData.forEach((data, index) => {
        const size = sliceSize(data, listTotal);
        iterateSlices(size, pieElement, offset, index, 0, color[index]);
        document.querySelectorAll(`${dataElement} li`)[index].style.borderColor = color[index];
        offset += size;
      });
    }

    createPie('.pieID.legend', '.pieID.pie');
  }, []);

  return (
    <AdminBaseLayout>
      <section>
        <div className="pieID pie"></div>
        <ul className="pieID legend">
          <li>
            <em>Humans</em>
            <span>100</span>
          </li>
          <li>
            <em>Dogs</em>
            <span>531</span>
          </li>
          <li>
            <em>Cats</em>
            <span>868</span>
          </li>
          <li>
            <em>Slugs</em>
            <span>344</span>
          </li>
          <li>
            <em>Aliens</em>
            <span>1145</span>
          </li>
        </ul>
      </section>
    </AdminBaseLayout>
  );
};

export default Requests;
