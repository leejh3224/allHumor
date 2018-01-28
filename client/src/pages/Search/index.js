import React from 'react'
// import PropTypes from 'prop-types'
import { colors, spacing, fonts } from 'styles/theme'

const Search = () => (
  <div css={{ width: '100%' }}>
    <div
      css={{
        display: 'flex',
        backgroundColor: colors.lightGrey,
        width: '100%',
        padding: spacing.small,
        position: 'relative',
        marginBottom: spacing.medium,
      }}
    >
      <i
        className="ion-ios-search-strong"
        css={{
          position: 'absolute',
          top: 18,
          left: 26,
          ...fonts.icon,
        }}
      />
      <input
        css={{
          flex: 1,
          ...fonts.body,
          borderRadius: 30,
          textIndent: 50,
        }}
        type="text"
        placeholder="검색: 올유머"
      />
      <button
        css={{
          backgroundColor: colors.lightGrey,
          color: colors.primary,
          cursor: 'pointer',
          padding: spacing.small,
          ...fonts.body,
        }}
      >
        취소
      </button>
    </div>
    <div
      css={{
        marginBottom: spacing.medium,
      }}
    >
      <h1
        css={{
          ...fonts.header,
          paddingLeft: spacing.medium,
        }}
      >
        인기 토픽
      </h1>
      <div
        css={{
          display: 'flex',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            css={{
              width: 100,
              height: 100,
            }}
            src="http://upload2.inven.co.kr/upload/2017/01/22/bbs/i14202744685.png"
            alt=""
          />
          <p>여프리</p>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            css={{
              width: 100,
              height: 100,
            }}
            src="http://cfile30.uf.tistory.com/image/22110D4858F46C680AAA2C"
            alt=""
          />
          <p>리븐</p>
        </div>
      </div>
    </div>
    <div>
      <h1
        css={{
          ...fonts.header,
          paddingLeft: spacing.medium,
        }}
      >
        인기 게시물
      </h1>
    </div>
  </div>
)

Search.propTypes = {}

export default Search
